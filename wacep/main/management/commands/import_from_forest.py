from django.core.management.base import BaseCommand
from django.conf import settings
from pagetree.models import Hierarchy
import requests
import os.path


class Command(BaseCommand):
    def handle(self, *args, **options):
        print "fetching content from forest..."
        url = "http://wacep2.forest.ccnmtl.columbia.edu/pagetree/export/"
        url = url + "?hierarchy=" + "wacep2.forest.ccnmtl.columbia.edu"
        d = requests.get(url).json()
        print "removing old pagetree hierarchy..."
        Hierarchy.objects.all().delete()
        print "importing the new one..."
        Hierarchy.from_dict(d)
        # override the hierarchy name (since it's coming from forest)
        h = Hierarchy.objects.all()[0]
        h.name = "main"
        h.save()

        print "pulling down uploaded files..."
        base_len = len("http://wacep2.forest.ccnmtl.columbia.edu/uploads/")
        for upload in d.get('resources', []):
            relative_path = upload[base_len:]
            relative_dir = os.path.join(*os.path.split(relative_path)[:-1])
            full_dir = os.path.join(settings.MEDIA_ROOT, relative_dir)
            try:
                os.makedirs(full_dir)
            except OSError:
                pass
            with open(os.path.join(settings.MEDIA_ROOT,
                                   relative_path), "w") as f:
                print "  writing %s to %s" % (upload, relative_path)
                f.write(requests.get(upload).text)
        print "done"
