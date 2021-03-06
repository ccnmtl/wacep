from django.http import HttpResponseRedirect, HttpResponse, Http404
from pagetree.helpers import get_section_from_path
from pagetree.helpers import get_module, needs_submit, submitted
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.template import RequestContext, loader
from wacep.certificates.models import CertificateCourse


@login_required
def courses(request):
    """ courses page."""
    file_name = 'main/courses.html'

    if request.user.is_staff:
        the_courses = CertificateCourse.objects.all()
    else:
        the_courses = [c.course for c in request.user.courses_i_take.all()]

    course_info = []
    for c in the_courses:
        course_info.append({'course': c})

    t = loader.get_template(file_name)
    c = RequestContext(
        request, {'the_courses': the_courses, 'course_info': course_info})
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


def get_sub_submodule_index(section):
    """In which part of the submodule is this section?"""
    if section.depth < 4:
        return 0
    if section.depth == 4:
        sub_submodule = section
    if section.depth > 4:
        sub_submodule = section.get_ancestors()[3]
    sibs = [s for s in sub_submodule.get_siblings()]
    result = sibs.index(sub_submodule)
    return result


def page(request, path):
    """ if there is a flatpage with this URL,
    throw a 404 so the flatpage middleware
    can take over and display the page.
    Otherwise proceed as usual.
    """
    from django.contrib.flatpages.models import FlatPage
    for f in FlatPage.objects.all():
        if ('/%s' % path) == f.url:
            raise Http404
    return pagetree_page(request, path)


def check_course_enrollment(user, section):
    if user.is_staff:
        return True

    root = section.hierarchy.get_root()
    ancestors = section.get_ancestors()
    ancestors_excluding_root = [section] + [a for a in ancestors if a != root]
    course_sections = [c.course.section for c in user.courses_i_take.all()]

    for a in ancestors_excluding_root:
        if a in course_sections:
            return True

    return False


@login_required
def pagetree_page(request, path):
    section = get_section_from_path(path)
    root = section.hierarchy.get_root()

    if not check_course_enrollment(request.user, section):
        return HttpResponseRedirect('/courses/')

    module = get_module(section)
    submodule = get_submodule(section)
    sub_submodule_index = get_sub_submodule_index(section)
    # using this number in the accordion settings
    # for  the left nav.

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
        return render(
            request, 'main/page.html',
            dict(
                section=section,
                module=module,
                submodule=submodule,
                sub_submodule_index=sub_submodule_index,
                needs_submit=needs_submit(section),
                is_submitted=submitted(section, request.user),
                modules=root.get_children(),
                root=section.hierarchy.get_root(),
            ))


@login_required
def edit_page(request, path):
    section = get_section_from_path(path)
    root = section.hierarchy.get_root()

    return render(request, 'main/edit_page.html',
                  dict(section=section,
                       module=get_module(section),
                       modules=root.get_children(),
                       root=section.hierarchy.get_root()))
