EMBER=./node_modules/.bin/ember

test: ./node_modules ./bower_components
	npm test

dist: ./node_modules ./bower_components
	${EMBER} build --environment=production

runserver: ./node_modules ./bower_components
	${EMBER} serve --proxy http://127.0.0.1:8000

clean:
	rm -rf node_modules bower_components dist tmp
	npm cache clear
	bower cache clean

./node_modules:
	npm install

./node_modules/.bin/bower:
	npm install

./bower_components:
	./node_modules/.bin/bower install

.PHONY: test dist runserver clean
