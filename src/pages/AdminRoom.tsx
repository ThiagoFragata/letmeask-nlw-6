import { useParams, useHistory } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import { Button } from "../components/Button";
import { Question } from "../components/Question";

import { RoomCode } from "../components/RoomCode";

import "../styles/room.scss";
import "../styles/question.scss";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

type RoomParamsType = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParamsType>();
  const history = useHistory();

  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleDeleteRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });
    toast.success("Sala encerrada!");
    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
    toast.success("Questão excluída!");
  }

  async function handleCheckQuestionAsAnswer(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
    toast.success("Questão respondida!");
  }
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
    toast.success("Questão em destaque!");
  }

  return (
    <div id="page-room">
      <div>
        <Toaster />
      </div>

      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleDeleteRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="questions-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswer(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img
                        src={answerImg}
                        alt="Dar destaque a pergunta pergunta"
                      />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
