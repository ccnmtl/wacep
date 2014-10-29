EMBER=./node_modules/.bin/ember

test: ./node_modules ./bower_components
	${EMBER} test

dist: ./node_modules ./bower_components
	${EMBER} build

clean:
	rm -rf node_modules bower_components dist tmp
	npm cache clear
	bower cache clean

./node_modules:
	npm install

./bower_components:
	bower install
