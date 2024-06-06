# Usage


## Sonar
https://sonarcloud.io/projects


## Linter installation

Install this package
```bash
sudo apt install golint
```

Add following script in `.git/hooks/` directory as `pre-commit`
```bash
#!/bin/bash

STAGED_GO_FILES=$(git diff --cached --name-only | grep ".go$")

if [[ "$STAGED_GO_FILES" = "" ]]; then
  exit 0
fi

PASS=true

for FILE in $STAGED_GO_FILES
do
  golint "-set_exit_status" $FILE
  if [[ $? == 1 ]]; then
    PASS=false
  fi

done

if ! $PASS; then
  printf "COMMIT FAILED\n"
  exit 1
else
  printf "COMMIT SUCCEEDED\n"
fi

exit 0
```

Server app
![alt text](<Screenshot 2024-06-06 202525.png>)