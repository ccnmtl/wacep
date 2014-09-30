from rest_framework import renderers


class EmberJSONRenderer(renderers.JSONRenderer):
    def render(self, data, media_type=None, renderer_context=None):

        # Nest the data under a root param if the view has "root" set,
        # and this is a request for a single item. I'm inferring this by
        # looking for an 'id' attribute in the root.
        if 'view' in renderer_context and \
                hasattr(renderer_context['view'], 'root') and \
                data is not None and \
                'id' in data:
            data = {renderer_context['view'].root: data}

        return super(EmberJSONRenderer, self).render(
            data, media_type, renderer_context)
