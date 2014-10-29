import json
from django.shortcuts import get_object_or_404
from rest_framework import pagination, serializers, status, views, viewsets
from rest_framework.response import Response
from .models import GameState, Move, Puzzle, PuzzleRound


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
        #serializer.data['id'] = 'mine'
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
