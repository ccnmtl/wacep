import datetime
import json
from django.core import serializers as django_serializers
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView, View
from rest_framework import pagination, serializers, status, views, viewsets
from rest_framework.response import Response

from .mixins import AdminRequiredMixin
from .models import GameState, Move, Puzzle, PuzzleRound
from .utils import Utils, ReportFileGenerator


class GameStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameState

    move_ids = serializers.PrimaryKeyRelatedField(many=True)


class GameStateView(views.APIView):
    root = 'game_state'

    def get(self, request, pk=None):
        current_user = request.user
        gs, created = GameState.objects.get_or_create(user=current_user)
        serializer = GameStateSerializer(gs)
        serializer.data['current_round_id'] = serializer.data['current_round']
        serializer.data['is_admin'] = Utils.is_admin(current_user)

        # The API only gives the front-end application a limited view of the
        # moves - we only want to expose moves that are related to the current
        # puzzle. This is because the front-end deletes all the moves that it
        # knows about when the user if any of the moves don't make sense for
        # current puzzle. That tends to happen when a new puzzle is started.
        #
        # Remove the moves that don't belong to current_round.puzzle.
        if serializer.data['current_round_id']:
            round = PuzzleRound.objects.get(
                pk=serializer.data['current_round_id'])

            filtered_move_ids = []
            for move_id in serializer.data['move_ids']:
                move = Move.objects.get(pk=move_id)
                if move.puzzle_round.puzzle == round.puzzle:
                    filtered_move_ids.append(move.id)

            serializer.data['move_ids'] = filtered_move_ids

        return Response(serializer.data)

    def put(self, request, pk=None):
        current_user = request.user
        gs = get_object_or_404(GameState, user=current_user)
        data = json.loads(request.body)

        try:
            new_round_id = data['game_state']['current_round_id']
            new_round = PuzzleRound.objects.get(pk=new_round_id)
            new_inventory = data['game_state']['current_inventory']
            gs.current_round = new_round
            gs.current_inventory = new_inventory
        except:
            pass

        gs.save()
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class MoveSerializer(serializers.ModelSerializer):
    game_state = serializers.PrimaryKeyRelatedField(many=False)

    class Meta:
        model = Move

    def from_native(self, data, files):
        # Like the customized render method in EmberJSONRenderer, we also
        # need to remove the root that ember-data puts on POST requests
        root = 'move'
        if data is not None and root in data:
            data = data[root]
            data['game_state'] = data['game_state_id']
            data['puzzle_round'] = data['puzzle_round_id']

        return super(MoveSerializer, self).from_native(data, files)


class MovePaginationSerializer(pagination.BasePaginationSerializer):
    class Meta:
        object_serializer_class = MoveSerializer

    results_field = 'moves'


class MoveViewSet(viewsets.ModelViewSet):
    model = Move
    root = 'move'
    serializer_class = MoveSerializer
    pagination_serializer_class = MovePaginationSerializer


class PuzzleRoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuzzleRound


class PuzzleRoundPaginationSerializer(pagination.BasePaginationSerializer):
    results_field = 'puzzle_rounds'

    class Meta:
        object_serializer_class = PuzzleRoundSerializer


class PuzzleRoundViewSet(viewsets.ModelViewSet):
    model = PuzzleRound
    root = 'puzzle_round'
    serializer_class = PuzzleRoundSerializer
    pagination_serializer_class = PuzzleRoundPaginationSerializer


class PuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puzzle

    puzzle_round_ids = serializers.PrimaryKeyRelatedField(many=True)


class PuzzlePaginationSerializer(pagination.BasePaginationSerializer):
    results_field = 'puzzles'

    class Meta:
        object_serializer_class = PuzzleSerializer


class PuzzleViewSet(viewsets.ModelViewSet):
    model = Puzzle
    root = 'puzzle'
    serializer_class = PuzzleSerializer
    pagination_serializer_class = PuzzlePaginationSerializer


class AdminPlayersView(AdminRequiredMixin, TemplateView):
    template_name = 'weatherroulette/players.html'

    def get_context_data(self, **kwargs):
        ctx = super(AdminPlayersView, self).get_context_data(**kwargs)

        ctx['participants'] = GameState.active_participants()

        all_puzzles = Puzzle.objects.all()
        ctx['puzzles'] = []
        for puzzle in all_puzzles:
            el = {
                'puzzle': puzzle,
                'participants': puzzle.active_participants(
                    ctx['participants']
                )
            }
            ctx['puzzles'].append(el)

        ctx['participant_moves'] = GameState.participant_moves(
            all_puzzles,
            ctx['participants']
        )

        ctx['participant_moves_json'] = json.dumps(ctx['participant_moves'])

        return ctx


class AdminExportParticipantDataView(AdminRequiredMixin, View):
    def get(self, request, **kwargs):
        participant_moves = GameState.participant_moves_for_csv(
            Puzzle.objects.all(),
            GameState.active_participants()
        )
        generator = ReportFileGenerator()
        filename = 'weatherroulette-participant-data'
        data = [[]] + participant_moves
        return generator.generate(
            filename=filename,
            column_names=['Weather Roulette Participant Progress',
                          datetime.datetime.now().strftime('%B %d, %Y')],
            rows=data,
            fileformat='csv'
        )


class AdminExportPuzzleView(AdminRequiredMixin, View):
    def get(self, request, **kwargs):
        puzzle = get_object_or_404(Puzzle, pk=kwargs['pk'])
        generator = ReportFileGenerator()
        filename = 'weatherroulette-' + puzzle.slug
        json = django_serializers.serialize(
            'json',
            [puzzle],
            fields=(
                'lessons_learned',
                'description',
                'is_locked',
                'starting_inventory',
                'has_secret_player',
                'display_name'
            ),
            indent=True
        )
        return generator.generate(
            filename=filename,
            formatted_data=json,
            fileformat='json'
        )
