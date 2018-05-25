#!/usr/bin/env bash
set -eu -o pipefail

showUsage() {
	cat <<-EOF
		Usage: @gsandf/configs <path>
		Copies project configs to path.
	EOF
}

main() {
	if [[ "$#" != "1" ]]; then
		showUsage
		exit
	fi

	echo "${BASH_SOURCE[0]} => $@"

	rsync -ac \
	  --exclude '*' \
	  --include '.editorconfig' \
	  --include '.gitignore' \
	  --include 'bitbucket-pipelines.yml' \
	  --ignore-existing \
	  "${BASH_SOURCE[0]}" \
	  $@

	[ -t 1 ] && echo 'Done!'
}

main $@
