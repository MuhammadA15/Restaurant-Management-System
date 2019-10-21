import os
from gitpandas.repository import Repository
# get the path of this repo
path = os.path.abspath('./')
# build an example repository object and try some things out
ignore_dirs = ['tests']
r = Repository(path, verbose=True)
# get the hours estimate for this repository (using 30 mins per commit)
he = r.hours_estimate(
    branch='master',
    grouping_window=0.75,
    single_commit_hours=0.75,
    limit=None,
    extensions=['js', 'sls', 'jinja', 'json', 'md'],
    ignore_dir=ignore_dirs
)
print(he)
