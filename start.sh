#!/bin/bash

code .
open -a "Hugo Server"
# Render to memory so the dev build (drafts, localhost URLs) never lands in docs/
hugo server -D --renderToMemory