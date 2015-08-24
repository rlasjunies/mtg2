#Continous integration

install heroku toolbelt

we need git install.
> git init

heroku login

heroku create

git init

git remote add github https://github.com/rlasjunies/pluralsight-ci.git

git push heroku master // to push the source code to heroku

git push -u github master

heroku ps:scale web=1

https://afternoon-everglades-8738.herokuapp.com/
