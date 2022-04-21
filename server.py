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


quiz = [
    {
        "id": "1",
        "question": "If Micheal Jordan was 6.6 Feet tall, what was his height in meters?",
        "imglink": "https://s.yimg.com/ny/api/res/1.2/TGNfajFSZVO2aKd_NxDFJw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ1MA--/https://s.yimg.com/uu/api/res/1.2/4kyJgbRwvypORBkUJIZZ7Q--~B/aD05MDA7dz0xMjgwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/hoops_hype_usa_today_sports_articles_974/43a74075a8f8f00a8554ef3b42f7c1c1",
        "op1": "1.2",
        "op2": "1.8",
        "op3": "2",
        "op4": "2.3",
        "correct": "2"
    },
    {
        "id": "2",
        "question": "If Earth is 384472 Kilometers away from the moon, what is the distance in miles?",
        "imglink": "https://nineplanets.org/wp-content/uploads/2020/09/Earth-moon-distance-384400km.jpg",
        "op1": "238,900",
        "op2": "280,000",
        "op3": "190,000",
        "op4": "320,000",
        "correct":"238,900"
    },
    {
        "id": "3",
        "question": "Lerner Hall (misc) is approximately 10 stories high, hom many meters tall is it?",
        "imglink": "https://lernerhall.columbia.edu/files/lerner/content/lerner-night-rev.gif",
        "op1": "15",
        "op2": "46",
        "op3": "53",
        "op4": "64",
        "correct": "46"
    },
    {
        "id": "4",
        "question": "Pulitzer hall (office) is approximately 9 stories high, how many meters tall is it?",
        "imglink": "https://www.wikicu.com/images/thumb/b/b9/Journalism.jpg/240px-Journalism.jpg",
        "op1": "40",
        "op2": "46",
        "op3": "49",
        "op4": "72",
        "correct": "49"
    },
    {
        "id": "5",
        "question": "Fayerweather hall (office) is approximately 10 stories high, how many meters tall is it?",
        "imglink": "https://admissionsblog.sipa.columbia.edu/wp-content/uploads/2017/02/tour-fayerweather8.png",
        "op1": "38",
        "op2": "44",
        "op3": "46",
        "op4": "79",
        "correct": "44"
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

@app.route('/temp')
def temp():
    global start
    global learnprogress
    news={
        "start":start,
        "progress":learnprogress
    }
    return render_template('temp.html', newstatus=news)  


 

@app.route('/quiz/<id>')
def quiz_question(id=None):
    global quiz
    global quizscore
    for q in quiz:
        if id==q["id"]:
            details=q
    quizs={
        "quizscore":quizscore
    }
    print(quizs)
    return render_template('quiz.html', detail=details, quizs=quizs) 


 
@app.route('/learn',  methods=['GET', 'POST'])
def learn():
    global start
    global learnprogress

    json_data = request.get_json() 
    start=json_data["start"]
    print(json_data)
    if start==1:
        learnprogress=json_data["progress"]+25
    news={
        "start":start,
        "progress":learnprogress
    }

    return jsonify(newstatus = news)

@app.route('/answer',  methods=['GET', 'POST'])
def answer():
    global quizscore
    json_data = request.get_json()
    print(json_data) 
    quizscore=json_data["quizscore"]
    newq={
        "quizscore":quizscore
    }
    return jsonify(quizs = newq)


if __name__ == '__main__':
   app.run(debug = True)




