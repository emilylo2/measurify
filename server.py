from http import client
from platform import java_ver
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import copy
app = Flask(__name__)


start = 0
learnprogress=0

quizscore=0
quest=0


quiz = [
    {
        "id": "1",
        "question": "If Micheal Jordan was 6.6 Feet tall, what was his height in meters?",
        "imglink": "https://s.yimg.com/ny/api/res/1.2/TGNfajFSZVO2aKd_NxDFJw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ1MA--/https://s.yimg.com/uu/api/res/1.2/4kyJgbRwvypORBkUJIZZ7Q--~B/aD05MDA7dz0xMjgwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/hoops_hype_usa_today_sports_articles_974/43a74075a8f8f00a8554ef3b42f7c1c1",
        "op1": "1.2",
        "op2": "1.8",
        "op3": "2",
        "op4": "2.3",
        "correct": "2",
        "topic":"height"
    },
    {
        "id": "2",
        "question": "If Earth is 384472 Kilometers away from the moon, what is the distance in miles?",
        "imglink": "https://nineplanets.org/wp-content/uploads/2020/09/Earth-moon-distance-384400km.jpg",
        "op1": "238,900",
        "op2": "280,000",
        "op3": "190,000",
        "op4": "320,000",
        "correct":"238,900",
        "topic": "distance"
    },
    {
        "id": "3",
        "question": "Approximately what temperature weather is the polar bear in?",
        "imglink": "https://i.guim.co.uk/img/media/bd0ae53a32f1d444fcf2a51181a7c895af2d012e/0_119_5184_3110/master/5184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=aba53ba9ba4175cf9cb51887b1f41ebc",
        "op1": "10C",
        "op2": "14F",
        "op3": "5C",
        "op4": "50F",
        "correct": "14F",
        "topic": "temp"
    },
    {
        "id": "4",
        "question": "This TV is 33 pounds, what is its approximate weight in kilograms",
        "imglink": "https://www.pngall.com/wp-content/uploads/5/LED-TV-PNG-Image.png",
        "op1": "15",
        "op2": "2",
        "op3": "40",
        "op4": "9",
        "correct": "15",
        "topic": "weight"
    }
]


# ROUTES



@app.route('/')
def homepage():
    return render_template('homepage.html')   


@app.route('/height')
def height():
    global start
    global learnprogress
    news={
        "start":start,
        "progress":learnprogress
    }
    return render_template('height.html', newstatus=news)   


@app.route('/weight')
def weight():
    global start
    global learnprogress
    news={
        "start":start,
        "progress":learnprogress
    }
    return render_template('weight.html', newstatus=news) 

@app.route('/distance')
def distance():
    global start
    global learnprogress
    news={
        "start":start,
        "progress":learnprogress
    }
    return render_template('distance.html', newstatus=news)  


@app.route('/end')
def end():
    global quizscore
    global quest
    quizs={
        "quizscore":quizscore,
        "question": quest
    }
    return render_template('end.html', quizs=quizs)  


 

@app.route('/quiz/<id>')
def quiz_question(id=None):
    global quiz
    global quizscore
    global quest
    for q in quiz:
        if id==q["id"]:
            details=q
    quizs={
        "quizscore":quizscore,
        "question": quest
    }
    return render_template('quiz.html', detail=details, quizs=quizs) 


 
@app.route('/learn',  methods=['GET', 'POST'])
def learn():
    global start
    global learnprogress

    json_data = request.get_json() 
    start=json_data["start"]
    if start==1:
        learnprogress=json_data["progress"]+33
        if learnprogress == 99:
            learnprogress = 100
    news={
        "start":start,
        "progress":learnprogress
    }

    return jsonify(newstatus = news)

@app.route('/answer',  methods=['GET', 'POST'])
def answer():
    global quizscore
    global quest
    json_data = request.get_json()
    print(json_data)
    quizscore=json_data["quizscore"]
    quest=int(json_data["question"])+1
    print(quest)
    newq={
        "quizscore":quizscore,
        "question":quest
    }
    return jsonify(quizs = newq)


if __name__ == '__main__':
   app.run(debug = True)




