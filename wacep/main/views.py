from annoying.decorators import render_to
from django.http import HttpResponseRedirect, HttpResponse
from pagetree.helpers import get_section_from_path
from pagetree.helpers import get_module, needs_submit, submitted
from django.contrib.auth.decorators import login_required
from django.template import RequestContext, loader


@render_to('main/index.html')
def index(request):
    return dict()

def splash(request):
    """ show the splash page."""
    #file_names = {
    #    'about'   : 'about.html',
    #    'credits' : 'credits.html',
    #    'contact' : 'contact.html',
    #    'help'    : 'help.html',
    #} 
    splash_path = 'splash.html'

    #if content_to_show not in file_names.keys():
    #    return HttpResponseRedirect('/accounts/login/?next=%s' % request.path)
    file_name = splash_path
    t = loader.get_template(file_name)
    c = RequestContext(request, {})
    return HttpResponse(t.render(c))  


@render_to('main/page.html')
def page(request, path):
    section = get_section_from_path(path)
    root = section.hierarchy.get_root()
    module = get_module(section)
    if section.id == root.id:
        # trying to visit the root page
        if section.get_next():
            # just send them to the first child
            return HttpResponseRedirect(section.get_next().get_absolute_url())

    if request.method == "POST":
        # user has submitted a form. deal with it
        if request.POST.get('action', '') == 'reset':
            section.reset(request.user)
            return HttpResponseRedirect(section.get_absolute_url())
        proceed = section.submit(request.POST, request.user)
        if proceed:
            return HttpResponseRedirect(section.get_next().get_absolute_url())
        else:
            # giving them feedback before they proceed
            return HttpResponseRedirect(section.get_absolute_url())
    else:
        return dict(section=section,
                    module=module,
                    needs_submit=needs_submit(section),
                    is_submitted=submitted(section, request.user),
                    modules=root.get_children(),
                    root=section.hierarchy.get_root(),
                    )


@login_required
@render_to('main/edit_page.html')
def edit_page(request, path):
    section = get_section_from_path(path)
    root = section.hierarchy.get_root()

    return dict(section=section,
                module=get_module(section),
                modules=root.get_children(),
                root=section.hierarchy.get_root())


@render_to('main/instructor_page.html')
def instructor_page(request, path):
    return dict()
