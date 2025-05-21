
var currentNumber = 1;
document.getElementById('fileOption').addEventListener('change', function () {

    var fileOption = this.value;
    var fileUpload = document.getElementById('fileUpload');

    if (fileOption === 'upload') {
        fileUpload.style.display = 'block';
    } else {
        fileUpload.style.display = 'none';
    }
});

// Hiển thị trạng thái loading khi bắt đầu yêu cầu
function showLoading() {
    console.log('mở')
    var loading = document.getElementById('loading');
    loading.style.display = 'block';
}

// Ẩn trạng thái loading khi kết thúc yêu cầu
function hideLoading() {
    console.log('đóng')
    var loading = document.getElementById('loading');
    loading.style.display = 'none';
}

function render(questions) {

    var numQuestions = questions.length;
    var questionsContainer = document.getElementById('questionsContainer');




    // Xóa các câu hỏi cũ trước khi tạo mới
    questionsContainer.innerHTML = '';
    currentNumber = numQuestions + 1;


    // Tạo các ô input cho câu hỏi và đáp án
    for (var i = 1; i <= numQuestions; i++) {

        var questionContent = document.createElement('div');
        questionContent.className = 'question-content';
        questionContent.id = i;

        var questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';

        var questionTitle = document.createElement('div');
        questionTitle.className = 'question-title';

        // new
        var deleteQuestionButton = document.createElement('div');
        deleteQuestionButton.className = 'delete-question';

        var iconDelete = document.createElement('i');
        iconDelete.className = 'ti-close';
        deleteQuestionButton.appendChild(iconDelete);
        deleteQuestionButton.onclick = function () {
            DeleteQuestion(this.parentNode.parentNode.id);
        }

        questionDiv.appendChild(deleteQuestionButton);

        //old
        var questionLabel = document.createElement('label');
        questionLabel.textContent = 'Câu hỏi ' + i + ':';

        var questionInput = document.createElement('textarea');
        questionInput.cols = 140;
        questionInput.rows = 3;
        questionInput.id = 'question' + i;
        questionInput.value = questions[i - 1].DeBai;


        questionTitle.appendChild(questionLabel);
        questionTitle.appendChild(questionInput);
        questionDiv.appendChild(questionTitle);
        questionContent.appendChild(questionDiv);
        // Tạo 4 ô input cho 4 đáp án và checkbox cho đáp án đúng


        for (var j = 1; j <= 4; j++) {
            var answerDiv = document.createElement('div');
            answerDiv.className = 'answer-container';

            var answerCheckbox = document.createElement('div');
            answerCheckbox.className = 'checkbox';
            answerCheckbox.id = i + 'checkbox' + j;
            answerCheckbox.onclick = function () {
                toggleCheckbox(this.id);
            };
            answerCheckbox.textContent = String.fromCharCode('A'.charCodeAt(0) + j - 1);

            var answerInput = document.createElement('textarea');
            answerInput.cols = "140";
            answerInput.rows = "1";
            answerInput.name = 'question' + i + 'answer' + j;
            answerInput.id = 'question' + i + 'answer' + j;
            answerInput.value = questions[i - 1].LuaChon[j - 1].NoiDung;

            if (questions[i - 1].LuaChon[j - 1].Dung == 1) {
                answerCheckbox.classList.add('checked');
            }

            answerDiv.appendChild(answerCheckbox);
            answerDiv.appendChild(answerInput);

            questionContent.appendChild(answerDiv);
            questionsContainer.appendChild(questionContent);
        }
    }
};



function Add() {

    var questionsContainer = document.getElementById('questionsContainer');

    var questionContent = document.createElement('div');
    questionContent.className = 'question-content';
    questionContent.id = currentNumber;

    var questionDiv = document.createElement('div');
    questionDiv.className = 'question-container';

    var questionTitle = document.createElement('div');
    questionTitle.className = 'question-title';

    // new
    var deleteQuestionButton = document.createElement('div');
    deleteQuestionButton.className = 'delete-question';

    var iconDelete = document.createElement('i');
    iconDelete.className = 'ti-close';
    deleteQuestionButton.appendChild(iconDelete);
    deleteQuestionButton.onclick = function () {
        DeleteQuestion(this.parentNode.parentNode.id);
    }

    questionDiv.appendChild(deleteQuestionButton);

    var questionLabel = document.createElement('label');
    questionLabel.textContent = 'Câu hỏi ' + currentNumber + ':';

    var questionInput = document.createElement('textarea');
    questionInput.cols = 70;
    questionInput.rows = 4;


    questionTitle.appendChild(questionLabel);
    questionTitle.appendChild(questionInput);

    questionDiv.appendChild(questionTitle);
    questionContent.appendChild(questionDiv);
    // Tạo 4 ô input cho 4 đáp án và checkbox cho đáp án đúng

    for (var j = 1; j <= 4; j++) {
        var answerDiv = document.createElement('div');
        answerDiv.className = 'answer-container';

        var answerCheckbox = document.createElement('div');
        answerCheckbox.className = 'checkbox';
        answerCheckbox.id = currentNumber + 'checkbox' + j;
        answerCheckbox.onclick = function () {
            toggleCheckbox(this.id);
        };
        answerCheckbox.textContent = String.fromCharCode('A'.charCodeAt(0) + j - 1);

        var answerInput = document.createElement('textarea');
        answerInput.cols = "70";
        answerInput.rows = "1";
        answerInput.name = 'question' + currentNumber + 'answer' + j;

        answerDiv.appendChild(answerCheckbox);
        answerDiv.appendChild(answerInput);

        questionContent.appendChild(answerDiv);

    }

    questionsContainer.appendChild(questionContent);
    currentNumber++;

}

function toggleCheckbox(idElement) {
    var element = document.getElementById(idElement);
    if (!element.classList.contains('checked')) {
        element.classList.add('checked')
    }
    else {
        element.classList.remove('checked')
    }

    if (element.style.backgroundColor === 'green') {
        element.style.backgroundColor = 'transparent';
    } else {
        element.style.backgroundColor = 'green';
    }
}

function hideAlert() {
    document.getElementById('myAlert').style.display = 'none';
}

function showAlert(content) {
    document.getElementById('alertContent').textContent = content;
    document.getElementById('myAlert').style.display = 'block';
    setTimeout(hideAlert, 3000);
}

async function Save(id) {

    var examDate = document.getElementById('examDate').value;
    var examTime = document.getElementById('timeStart').value;

    var examDateTime = examDate + 'T' + examTime;

    var formData = {
        examName: document.getElementById('examName').value,
        examDateTime: examDateTime,
        examTime: document.getElementById('examTime').value,
        numQuestions: document.getElementById('numQuestions').value,
    };

    if (!examDate || !examTime || !formData.numQuestions || !formData.examTime || !formData.examName) {
        showAlert('Vui lòng điền đầy đủ thông tin cho bài thi');
    }
    else {
        var questions = [];

        var questionNum = formData.numQuestions

        if (questionNum === 0) {
            alert('Số câu hỏi đang là 0')
            return
        }

        for (var i = 1; i <= questionNum; i++) {

            var answer = [];
            var check = "";
            var questionContent = document.getElementById('question' + i).value
            if (questionContent === "") {
                showAlert('Vui lòng nhập đề bài cho câu hỏi ' + i);
                return;
            }
            for (var j = 1; j <= 4; j++) {
                if (document.getElementById(i + 'checkbox' + j).classList.contains('checked')) {
                    check = j;
                }
                var ans = document.getElementById('question' + i + 'answer' + j).value
                if (ans === '') {
                    showAlert('Bạn chưa nhập đáp án cho câu hỏi ' + i)
                    return;
                }
                answer.push(ans);
            }

            if (check === "") {
                showAlert('Bạn chưa chọn đáp án đúng cho câu hỏi ' + i)
                return;
            }

            questions.push({
                questionContent: questionContent,
                answer1: answer[0],
                answer2: answer[1],
                answer3: answer[2],
                answer4: answer[3],
                check: check
            })
        }

        var newImageUrl = "https://res.cloudinary.com/dyc1c2elf/image/upload/v1714894653/hpz5yqojda1ajpnrpkvv.jpg";
        var fileInput = document.getElementById('image-file');
        var file = fileInput.files[0];

        if (file) {
            var formImg = new FormData();
            formImg.append('file', file);

            try {
                const response = await fetch('/admin/test/cloudinary-upload', {
                    method: 'POST',
                    body: formImg
                });
                const data = await response.json();
                newImageUrl = data.img_url;
            } catch (error) {
                console.error('Error:', error);
            }

            formData.imageUrl = newImageUrl;
        }

        const backendURL = '/api/update-test/' + id;

        // //console.log(questions)
        // //console.log(formData);

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ metadata: formData, data: questions })
        };

        // //console.log(options)
        showLoading()
        await fetch(backendURL, options)

            .then(response => {
                if (!response.ok) {
                    throw new Error('Có lỗi xảy ra khi gửi yêu cầu: ' + response.status);
                }
                return response.json(); // Trả về phản hồi dưới dạng JSON
            })

            .then(data => {
                //console.log('Dữ liệu đã được gửi thành công đến backend:', data);
                hideLoading()
                window.location.href = "/admin/test";
            })
            .catch(error => {
                showAlert('Đã xảy ra lỗi');
                console.error('Đã xảy ra lỗi khi gửi dữ liệu đến backend:', error);
            });
    }


}

function DeleteQuestion(id) {
    var element = document.getElementById(id);
    //console.log(element);
    UpDateIdForQuestion(id);
    element.remove();
}

function UpDateIdForQuestion(id) {
    for (var i = parseInt(id) + 1; i < currentNumber; i++) {
        var element = document.getElementById(i);

        if (element) {
            var oldId = i.toString();
            element.id = i - 1;
            var questionLabels = element.querySelectorAll('label');
            questionLabels[0].textContent = 'Câu hỏi ' + element.id + ':';
            for (var j = 1; j <= 4; j++) {
                var oldCheckBoxId = oldId + 'checkbox' + j;
                var checkbox = document.getElementById(oldCheckBoxId);
                if (checkbox) {
                    checkbox.id = element.id + 'checkbox' + j;
                }
            }
        }
    }
    currentNumber--;
}

