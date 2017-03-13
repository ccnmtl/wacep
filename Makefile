APP=wacep
JS_FILES=media/js/scrolling_table.js media/forecaster/

all: jenkins

include *.mk

eslint: $(JS_SENTINAL)
	$(NODE_MODULES)/.bin/eslint $(JS_FILES)

.PHONY: eslint
