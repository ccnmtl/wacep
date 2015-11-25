MANAGE=./manage.py
APP=wacep
FLAKE8=./ve/bin/flake8

jenkins: ./ve/bin/python check flake8 jshint jscs test

./ve/bin/python: requirements.txt bootstrap.py virtualenv.py
	./bootstrap.py

test: ./ve/bin/python
	$(MANAGE) jenkins --pep8-exclude=.git,migrations --enable-coverage --coverage-rcfile=.coveragerc

	# FIXME
	#cd media/WeatherRoulette/ && npm install && \
	#	./node_modules/.bin/bower install && \
	#	npm test

flake8: ./ve/bin/python
	$(FLAKE8) $(APP) --exclude=migrations --max-complexity=10

runserver: ./ve/bin/python check
	$(MANAGE) runserver

migrate: ./ve/bin/python check jenkins
	$(MANAGE) migrate

check: ./ve/bin/python
	$(MANAGE) check

shell: ./ve/bin/python
	$(MANAGE) shell_plus

jshint: node_modules/jshint/bin/jshint media/js/scrolling_table.js media/forecaster/ media/WeatherRoulette/ media/WeatherRouletteAdmin
	./node_modules/jshint/bin/jshint

jscs: node_modules/jscs/bin/jscs
	./node_modules/jscs/bin/jscs media/js/scrolling_table.js media/forecaster/ media/WeatherRoulette/app/ media/WeatherRoulette/tests/ media/WeatherRouletteAdmin/

node_modules/jshint/bin/jshint:
	npm install jshint --prefix .

node_modules/jscs/bin/jscs:
	npm install jscs --prefix .

clean:
	rm -rf ve
	rm -rf media/CACHE
	rm -rf reports
	rm -f celerybeat-schedule
	rm -f .coverage
	find . -name '*.pyc' -exec rm {} \;

pull:
	git pull
	make check
	make test
	make migrate
	make flake8

rebase:
	git pull --rebase
	make check
	make test
	make migrate
	make flake8

# run this one the very first time you check
# this out on a new machine to set up dev
# database, etc. You probably *DON'T* want
# to run it after that, though.
install: ./ve/bin/python check jenkins
	createdb $(APP)
	$(MANAGE) syncdb --noinput
	make migrate
