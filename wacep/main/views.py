from annoying.decorators import render_to
from django.http import HttpResponseRedirect, HttpResponse
from pagetree.helpers import get_section_from_path
from pagetree.helpers import get_module, needs_submit, submitted
from django.contrib.auth.decorators import login_required
from django.template import RequestContext, loader
from django.conf import settings


@render_to('main/index.html')
def index(request):
    return dict()


def splash_or_page(request, path):
    show_splash = False
    try:
        if settings.SHOW_SPLASH:
            show_splash = True
    except AttributeError:
        show_splash = False

    if show_splash:
        if request.user.is_anonymous():
            return splash(request)
        else:
            return page(request, path)
    else:
        return page(request, path)


def splash(request):
    """ show the splash page."""
    splash_path = 'splash.html'
    file_name = splash_path
    t = loader.get_template(file_name)
    c = RequestContext(request, {})
    return HttpResponse(t.render(c))


@login_required
def courses(request):
    """ show the splash page."""
    the_courses = get_section_from_path('/').get_children()
    file_name = 'main/courses.html'
    t = loader.get_template(file_name)
    c = RequestContext(request, {'the_courses': the_courses})
    return HttpResponse(t.render(c))


def get_submodule(section):
    """ get the top level module that the section is in"""
    if section.is_root():
        return None
    if section.depth == 2:
        return None
    if section.depth == 3:
        return section
    return section.get_ancestors()[2]


@login_required
@render_to('main/page.html')
def page(request, path):
    section = get_section_from_path(path)
    root = section.hierarchy.get_root()
    module = get_module(section)
    submodule = get_submodule(section)

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
                    submodule=submodule,
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
