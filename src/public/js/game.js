const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
// const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
// let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let myArray = new Array(100).fill(0);
let ansUser = [];
let questions = [];
// //console.log(test)
let jsonQuestions = '../cauhoi/' + localStorage.getItem('currentSubject') + '.json';
// localStorage.setItem('setTime', 1)

var data = JSON.parse(document.querySelector('script').getAttribute('data-data'));
// //console.log(data);
// fetch(jsonQuestions)
let offsetHours = 7;
let currentTime = new Date();

let adjustedTime = new Date(currentTime.getTime() + (offsetHours * 60 * 60 * 1000));

let ThoiGianLamBai = adjustedTime.toISOString().slice(0, 19).replace('T', ' ');

//console.log(ThoiGianLamBai);

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

// startGame = () => {
    questionCounter = 0;
    // score = 0;
    availableQuesions = [...questions];
    // //console.log(availableQuesions);
    ansUser = myArray;
    // getNewQuestion();
    
// };

// hiencauhoi = () => {
    let subject = document.getElementById('subject');
    subject.textContent = data.test.TenBaithi;
    // //console.log(data.test.TenBaithi)

    let cauhoi = document.getElementById('cauhoi');
    // //console.log(cauhoi);
    // //console.log("so cau hoi:", availableQuesions.length);
    for(let i=0; i<data.questions.length; i++) {
        let container_hoitrl = document.createElement('div');
        container_hoitrl.classList.add('container-hoitrl');
        container_hoitrl.id = i;

        let stt = document.createElement('div');
        stt.classList.add('stt');
        stt.textContent = 'Câu ' + (i+1);
        container_hoitrl.appendChild(stt);

        let container_cauhoi = document.createElement('div');
        container_cauhoi.textContent = data.questions[i].DeBai;
        //console.log(data.questions[i].DeBai)
        container_cauhoi.classList.add('container-cauhoi');
        container_hoitrl.appendChild(container_cauhoi);

        for(let j=0; j<data.questions[i].LuaChon.length; j++) {
            let container_choice = document.createElement('div');
            container_choice.classList.add('choice');
            container_choice.textContent = data.questions[i].LuaChon[j].NoiDung;
            container_hoitrl.appendChild(container_choice);
        }
        cauhoi.appendChild(container_hoitrl);
    }
    let trangthai = document.getElementById('trangthai');

    let blockDiv = document.createElement('div');
    blockDiv.id = 'blockDiv';
    for(let i=0; i<data.questions.length; i++) {
        let block = document.createElement('span');
        block.classList.add('block');
        block.id = 'block' + (i+1);
        block.textContent = i + 1;
        blockDiv.appendChild(block);
    }
    trangthai.appendChild(blockDiv);

    let choice = Array.from(document.getElementsByClassName('choice'));
    // //console.log('choice: ', choice);
    for(let i=0; i<choice.length; i++) {
        let x = choice[i];
        x.addEventListener('click', (e) => {
            let selectedChoice = e.target;
            let cauhoiId = parseInt(selectedChoice.parentElement.id);
            let block = document.getElementById('block'+(cauhoiId+1));
            if(selectedChoice.classList.contains('pick')) {
                selectedChoice.classList.remove('pick');
                block.style.background = 'white';
                ansUser[parseInt(cauhoiId)] = 0;
                return;
            }
            block.style.background = '#578fde';
            let selectedAnswer = i - cauhoiId * 4 + 1;
            ansUser[parseInt(cauhoiId)] = selectedAnswer;

            selectedChoice.classList.add('pick');
            choice.forEach((x) => {
                if(x != selectedChoice && x.classList.contains('pick') && x.parentElement.id == selectedChoice.parentElement.id)
                    x.classList.remove('pick');
            });

        });
    }
    let arrBlocks = Array.from(document.getElementsByClassName('block'));
    arrBlocks.forEach((block) => {
        block.addEventListener('click', () => {
            let target = document.getElementById(parseInt(block.textContent) - 1);
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
    })

// }

nopbai = async () => {
    //console.log(data)
    openDialog('Nộp bài', 'Thời gian làm bài thi chưa hết, bạn có chắc chắn muốn nộp bài?', async () => {
        localStorage.setItem('answerofUser', JSON.stringify(ansUser));
        let metadata = []
        let dataoption = []

        let offsetHours = 7;
        let currentTime = new Date();
    
        let adjustedTime = new Date(currentTime.getTime() + (offsetHours * 60 * 60 * 1000));
    
        let ThoiGianNopBai = adjustedTime.toISOString().slice(0, 19).replace('T', ' ');
    
        //console.log(ThoiGianNopBai);

        metadata.push({
            "start" : ThoiGianLamBai,
            "finish": ThoiGianNopBai,
            "mabaithi": data.test.MaBaiThi
        })
        for(let i=0; i<data.questions.length; i++) {
            let option = ''
            if(ansUser[i] != 0) option = String.fromCharCode(64+ansUser[i]);
            else option = 'E'
            dataoption.push({
                "macauhoi": data.questions[i].MaCauHoi,
                "maluachon": option
            })
        }
        // //console.log({metadata, dataoption})
        let databody = JSON.stringify({ metadata, dataoption });

        fetch("/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: databody
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //console.log(data)
            let resultId = data.data.MaKetQua;
            window.location.assign(`../tn/${resultId}`);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        
        
    });
}
thoat = () => {

    openDialog('Thoát', 'Tiến trình sẽ không được lưu lại, bạn có muốn thoát khỏi bài thi?', function() {
        window.location.assign('../../practice/tn');
    });
}

if(data.test.ThoiGianThi > 0 && !(localStorage.getItem('time') == 0 || localStorage.getItem('time') == null)) {

    var distance = 1000 * data.test.ThoiGianThi * 60;
    // Cập nhật thời gian mỗi 1 giây
    var timer = setInterval(function() {
    
        // Tính toán thời gian còn lại
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        distance -= 1000;
        document.getElementById('countdown').innerHTML = minutes + ':' + seconds ;
        
        if (distance < -1000) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'Hết thời gian!';
            let btnClose = document.getElementById('btn-close');
            btnClose.style.display = 'none';
            openDialog('Hết giờ', "Xem kết quả", ()=> {
                let btnClose = document.getElementById('btn-close');
                btnClose.style.display = 'none';
                return window.location.assign('../html/end.html');
            });
            localStorage.setItem('answerofUser', JSON.stringify(ansUser));
            // return window.location.assign('../html/end.html');
        }
    }, 1000);
}

document.addEventListener('scroll', function() {
    var rightDiv = document.getElementById('action');
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var leftDiv = document.getElementById('cauhoi');
    var leftDivBottom = leftDiv.getBoundingClientRect().bottom;
    var rightDivBottom = rightDiv.getBoundingClientRect().bottom;
    
    // //console.log(leftDivBottom + ' ' + rightDivBottom);
    
    if (leftDivBottom > rightDivBottom) {
        rightDiv.style.top = (scrollTop) + 'px';
    }
});


function openDialog(tittle, content, func) {
    // localStorage.setItem('setTime', 0);
    var dialogOverlay = document.getElementById('dialogOverlay');
    var dialogContent = document.getElementById('dialogContent');
    var content1 = document.getElementById('content-dialog');
    var question = document.getElementById('question-dialog');
    var btnContinue = document.getElementById('btn-continue');
    question.innerHTML = `<p class="sent" id="question-dialog">${content}</p>`;
    content1.textContent = tittle;
    btnContinue.onclick = func;
    dialogOverlay.style.display = 'block';
    dialogContent.style.display = 'block';
    //console.log('click');
}

// Hàm đóng dialog
function closeDialog() {
    // localStorage.setItem('setTime', 1);
    var dialogOverlay = document.getElementById('dialogOverlay');
    var dialogContent = document.getElementById('dialogContent');
    dialogOverlay.style.display = 'none';
    dialogContent.style.display = 'none';
}
