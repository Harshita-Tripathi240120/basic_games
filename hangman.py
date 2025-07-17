# A Python script to simulate a hangman game.
# The words used in this game are the names of movies.
# The user has 8 lives to correctly guess the name of the movie .
import os,random

# 'hangmanPattern' is a function that stores all the 8 different hangman patterns .
# 8 different patterns to indicate each of those 8 lives.
# the dictionary 'hang' stores all the 8 different forms.
def hangmanPattern():
    file=open('hangman.txt','r')
    m=file.readlines()
    string=''
    hang={}
    k=0
    for i in m:
        if not i=='\n':
            string+=i
        else:
            hang[k]=string
            k+=1
            string=''
    file.close()
    return(hang)

# 'movieSelect is the function used to select a random movie from the 'movie.txt' file.
# 'mov' variable will store the random movie name.
def movieSelect():
    file=open('movie.txt','r')
    m=file.readlines()
    length=len(m)
    randomMovieNumber=random.randrange(length)
    mov=m[randomMovieNumber].rstrip('\n')
    file.close()
    return(mov)

# 'stringReplace' is a function used to replace the blanks with the correct letter guessed.
# It returns a list of all the indexes in the original movie name , where that particular letter occurs.
def stringReplace(GuessString,letter):
    l=list(GuessString)
    l2=[]
    for i in range(len(l)):
        if ((str(letter).upper() == l[i]) or (str(letter).lower()==l[i])):
            l2.append(i)
    return(l2)

# 'choose' is used to iterate over all the possible hangman patterns.
def choose(l):
    l=l-1
    return(l)
    


print('\n\t\t********** WELCOME TO HANGMAN GAME. **********\n')
print('\nINSTRUCTIONS :- YOU HAVE 9 LIVES TO GUESS THE NAME OF THE MOVIE , FAILING TO DO SO , WILL RESULT IN DEATH !!! . Good Luck !\n\n')

# 'hangmanPatt' stores all the 8 different patterns for each of those 8 lives.
# 'movieName' stores the random movie name.
# 'blankString' stores the 'dashed' string to be displayed on startup.
# ex:- if movieName= 'Prince of Persia' , then blankString='- - - - - - / - - / - - - - - - '
# Each dash represents each letter in movieName and each slashes indicate blank space between two words.
# 'correctString' stores the correct movie name in 'dash and slash' format .
# ex , correctString='p r i n c e / o f / p e r s i a'
hangmanPatt=hangmanPattern()
movieName=movieSelect()
lengthOfMovie=len(movieName)
blankString=''
correctString=''
for i in range(len(movieName)):
    if movieName[i]==' ':
        blankString+='/ '
        correctString+='/ '
    else:
        blankString+='- '
        correctString+=movieName[i]+' '

b=8

# 'userInput' stores the letter entered by the user.
# If the letter exists in the movie name , then 'ListofIndexes' stores all the indexes of the letter in the movie name.
# Finally , the 'blankString' is modiefied by inserting the letter in appropriate indexes , while the other letters remain dashed , until guessed correctly.
# If the letter entered is not preset in the movie name , then the number of lives is decremented by 1.
# Once the number of lives reaches 0 , or the user guesses all the letters correctly, the script terminates.
# os.system('cls') is used to clear the screen after every trial , so that the next trial be shown in the same line.

while True:
    userInput=str(input('\nGUESS A LETTER : '))
    os.system('cls')
    print('\n\t\t********** WELCOME TO HANGMAN GAME. **********\n')
    print('\nINSTRUCTIONS :- YOU HAVE 9 LIVES TO GUESS THE NAME OF THE MOVIE , FAILING TO DO SO , WILL RESULT IN DEATH !!! . Good Luck !\n\n')
    if  ((userInput.upper() in movieName) or (userInput.lower() in movieName)) :
        ListofIndexes=stringReplace(movieName,userInput)
        blankList=[]
        blankList=blankString.split(' ')
        for g in ListofIndexes:
            blankList[g]=userInput
        blankString=' '.join(blankList)
        print(str(hangmanPatt[b].rstrip('\n'))+'\t\t'+blankString+'\n'+'\nNUMBER OF LIVES LEFT :-'+str(b))
        
        if blankString.lower()==correctString.lower():
            print('\n\tCONGRATULATIONS ! YOU HAVE BEEN SPARED FROM DEATH !!\n\n\n ')
            break
        
        
    else:
        b=choose(b)
        if b==0:
            print(str(hangmanPatt[b].rstrip('\n'))+'\t\t'+blankString+'\n'+'\nNUMBER OF LIVES LEFT :-'+str(b))
            print('\n\t\tGAME OVER ! HANGED !!!')
            print('\tTHE MOVIE NAME WAS :-  '+correctString+'\n\n\n')
            break
        print(str(hangmanPatt[b].rstrip('\n'))+'\t\t'+blankString+'\n'+'\nNUMBER OF LIVES LEFT :-'+str(b))
        
       
   
    
            
        
