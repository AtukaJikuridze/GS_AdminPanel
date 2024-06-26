import axios from "axios";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [balance, setBalance] = useState(null);
  const [openedBalance, setOpenedBalance] = useState(false);
  const [openedReg, setOpenedReg] = useState(false);
  const [email, setEmail] = useState("");
  const [openAmount, setOpenAmount] = useState(false);
  const [amount, setAmount] = useState("");
  const [stoppingGame, setStoppingGame] = useState(false);
  const [depositing, setDepositing] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [giftCard, setGiftCard] = useState(false);
  const [usersGiftcards, setUsersGiftcards] = useState(false);
  const [usersGifts, setUsersGifts] = useState([]);
  const [addingQuestions, setAddingQuestions] = useState(false);
  const [questionOnGeorgian, setQuestionOnGeorgian] = useState("");
  const [questionOnEnglish, setQuestionOnEnglish] = useState("");
  const [firstanswerGe, setFirstAnswerGe] = useState("");
  const [secondanswerGe, setSecondAnswerGe] = useState("");
  const [threetanswerGe, setThreeAnswerGe] = useState("");
  const [fourtanswerGe, setfourAnswerGe] = useState("");
  const [firstanswerEn, setFirstAnswerEn] = useState("");
  const [secondanswerEn, setSecondAnswerEn] = useState("");
  const [threetanswerEn, setThreeAnswerEn] = useState("");
  const [fourtanswerEn, setfourAnswerEn] = useState("");
  const [rightAnswerGe, setRightAnswerGe] = useState("");
  const [rightAnswerEn, setRightAnswerEn] = useState("");
  const [registeredUsers,setRegisteredUsers]=useState(null)
  const questionsData = {
    question_GE: questionOnGeorgian,
    question_EN: questionOnEnglish,
    answer_1_GE: firstanswerGe,
    answer_2_GE: secondanswerGe,
    answer_3_GE: threetanswerGe,
    answer_4_GE: fourtanswerGe,
    answer_1_EN: firstanswerEn,
    answer_2_EN: secondanswerEn,
    answer_3_EN: threetanswerEn,
    answer_4_EN: fourtanswerEn,
    right_answer_GE: rightAnswerGe,
    right_answer_EN: rightAnswerEn,
  };
  useEffect(() => {
    axios.get("https://testapi-pd9s.onrender.com/api/users/registered_users").then((response)=>{
setRegisteredUsers(response.data)
    })
    axios
      .get("https://testapi-pd9s.onrender.com/api/admin/balance")
      .then((response) => {
        setBalance(response.data.total);
      });
    axios
      .get("https://testapi-pd9s.onrender.com/api/admin/gift-cards")
      .then((response) => {
        setUsersGifts(response.data);
      });
  }, []);

  return (
    <>
      <div className="game_card">
        <div
          className="game_inner_card"
          onClick={() => {
            setOpenAmount(!openAmount);
          }}
        >
          start game
        </div>
        {openAmount && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post(
                  "https://testapi-pd9s.onrender.com/api/admin/start-game",
                  {
                    amount_to_be_distributed: amount,
                  }
                )
                .then((response) => {
                  if (response.data == "თამაში უკვე დაწყებულია") {
                    alert(response.data);
                  } else if (
                    response.data == "არცერთი მომხმარებელი არ ცვლის თანხას"
                  ) {
                    alert(response.data);
                  } else {
                    window.location.reload();
                  }
                });
            }}
          >
            თანხა რომელიც უნდა გადანაწილდეს მომხმარებლებზე
            <input
              required
              type="text"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <button type="submit">start</button>
          </form>
        )}

        <div
          className="game_inner_card"
          onClick={() => {
            setStoppingGame(!stoppingGame);
          }}
        >
          stop game
        </div>
      </div>
      {stoppingGame && (
        <div className="modal">
          <div>ნამდვილად გაჩერდეს თამაში?</div>
          <div>
            <button
              className="stopgame_button"
              onClick={(e) => {
                e.preventDefault();
                axios
                  .post("https://testapi-pd9s.onrender.com/api/admin/stop-game")
                  .then((response) => {
                    if (response.data == "თამაში უკვე დასტოპებულია") {
                      alert(response.data);
                    } else {
                      window.location.reload();
                    }
                  });
              }}
            >
              თამაშის გაჩერება
            </button>
            <button
              onClick={() => {
                setStoppingGame(!stoppingGame);
              }}
            >
              გამოსვლა
            </button>
          </div>
        </div>
      )}
      <div>გასაცემი თანხა:{balance}</div>
      <div>რეგისტრირებული მომხმარებლების რაოდენობა:{registeredUsers}</div>
      <div></div>
      <div className="wrapper">
        <div
          className="wrapper-button"
          onClick={() => {
            setOpenedBalance(!openedBalance);
          }}
        >
          subscription(თვიური გადასახადი)
        </div>
        {openedBalance && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post(
                  "https://testapi-pd9s.onrender.com/api/admin/subscription",
                  { email: email }
                )
                .then(() => {
                  window.location.reload();
                });
            }}
          >
            მომხმარებლის მეილი:
            <input
              required
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button type="submit">გამოიწერა</button>
          </form>
        )}
      </div>
      <div className="wrapper">
        <div
          className="wrapper-button"
          onClick={() => {
            setOpenedReg(!openedReg);
          }}
        >
          registration(ახალი მომხმარებელი დარეგისტრირდა)
        </div>
        {openedReg && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post(
                  "https://testapi-pd9s.onrender.com/api/admin/registration",
                  { email: email }
                )
                .then(() => {
                  window.location.reload();
                });
            }}
          >
            მომხმარებლის მეილი:
            <input
              required
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button type="submit">დარეგისტრირდა</button>
          </form>
        )}
      </div>
      <div className="wrapper">
        <div
          className="wrapper-button"
          onClick={() => {
            setDepositing(!depositing);
          }}
        >
          მომხმარებელმა ჩარიცხა თანხა ბალანსის შესავსებად
        </div>
        {depositing && (
          <form
            className="deposit_form"
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post("https://testapi-pd9s.onrender.com/api/admin/deposit", {
                  email: email,
                  amount: amount,
                })
                .then(() => {
                  window.location.reload();
                });
            }}
          >
            <div>
              მომხმარებლის მეილი
              <input
                required
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              შემოტანილი თანხა
              <input
                required
                type="text"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <button type="submit">შევსება</button>
          </form>
        )}
      </div>
      <div className="wrapper">
        <div
          className="wrapper-button"
          onClick={() => {
            setWithdraw(!withdraw);
          }}
        >
          მომხმარებელს გააქვს თანხა
        </div>
        {withdraw && (
          <form
            className="deposit_form"
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post("https://testapi-pd9s.onrender.com/api/admin/withdraw", {
                  email: email,
                  amount: amount,
                })
                .then(() => {
                  window.location.reload();
                })
                .catch((error) => {
                  alert(error.response.data);
                });
            }}
          >
            <div>
              მომხმარებლის მეილი
              <input
                required
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              გასატანი თანხა
              <input
                required
                type="text"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <button type="submit">შევსება</button>
          </form>
        )}
      </div>
      <div className="wrapper">
        <div
          className="wrapper-button"
          onClick={() => {
            setGiftCard(!giftCard);
          }}
        >
          მომხმარებელმა მიიღო გიფტ ქარდი
        </div>
        {giftCard && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post(
                  "https://testapi-pd9s.onrender.com/api/admin/gift-cards",
                  { email: email }
                )
                .then(() => {
                  window.location.reload();
                });
            }}
          >
            მომხმარებლის მეილი
            <input
              required
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button type="submit">დადასტურება</button>
          </form>
        )}
      </div>
      <div className="wrapper">
        <div
          className="wrapper-button"
          onClick={() => {
            setUsersGiftcards(!usersGiftcards);
          }}
        >
          მომხმარებლები რომლებსაც უნდა გაეგზავნოს სასაჩუქრე ვაუჩერი
        </div>
      </div>
      {usersGiftcards && (
        <div className="modal">
          <i
            className="fa-solid fa-x"
            onClick={() => {
              setUsersGiftcards(!usersGiftcards);
            }}
          ></i>
          {usersGifts.map((data: any, index) => {
            return (
              <div key={index} className="wrapper">
                <span>
                  <p>მეილი: {data.email}</p>
                </span>
                <span>
                  <p>ნაყიდი ქარდი: {data.product_name}</p>
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div className="wrapper">
        <div
          className="wrapper-button"
          onClick={() => {
            setAddingQuestions(!addingQuestions);
          }}
        >
          კითხვის დამატება (ეს მარტო მაშინ როცა თამაში დასტოპებულია)
        </div>
      </div>
      {addingQuestions && (
        <form
          className="questions_modal"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post(
                "https://testapi-pd9s.onrender.com/api/admin/add-question",
                questionsData
              )
              .then(() => {
                window.location.reload();
              })
              .catch((error) => {
                alert(error.response.data);
              });
          }}
        >
          <i
            className="fa-solid fa-x"
            onClick={() => {
              setAddingQuestions(!addingQuestions);
            }}
          ></i>
          <div className="question_wrapper">
            <p>კითხვა (ქართულად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setQuestionOnGeorgian(e.target.value);
              }}
            />
          </div>
          <div className="question_wrapper">
            <p>კითხვა (ინგლისურად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setQuestionOnEnglish(e.target.value);
              }}
            />
          </div>
          <div className="question_wrapper">
            <p>პირველი სავარაუდო პასუხი (ქართულად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setFirstAnswerGe(e.target.value);
              }}
            />
          </div>
          <div className="question_wrapper">
            <p>მეორე სავარაუდო პასუხი (ქართულად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setSecondAnswerGe(e.target.value);
              }}
            />
          </div>{" "}
          <div className="question_wrapper">
            <p>მესამე სავარაუდო პასუხი (ქართულად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setThreeAnswerGe(e.target.value);
              }}
            />
          </div>
          <div className="question_wrapper">
            <p>მეოთხე სავარაუდო პასუხი (ქართულად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setfourAnswerGe(e.target.value);
              }}
            />
          </div>{" "}
          <div className="question_wrapper">
            <p>პირველი სავარაუდო პასუხი (ინგლისურად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setFirstAnswerEn(e.target.value);
              }}
            />
          </div>
          <div className="question_wrapper">
            <p>მეორე სავარაუდო პასუხი (ინგლისურად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setSecondAnswerEn(e.target.value);
              }}
            />
          </div>
          <div className="question_wrapper">
            <p>მესამე სავარაუდო პასუხი (ინგლისურად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setThreeAnswerEn(e.target.value);
              }}
            />
          </div>
          <div className="question_wrapper">
            <p>მეოთხე სავარაუდო პასუხი (ინგლისურად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setfourAnswerEn(e.target.value);
              }}
            />
          </div>
          <div className="question_wrapper">
            <p>სწორი პასუხი (ქართულად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setRightAnswerGe(e.target.value);
              }}
            />
          </div>
          <div className="question_wrapper">
            <p>სწორი პასუხი (ინგლისურად)</p>
            <input
              required
              type="text"
              onChange={(e) => {
                setRightAnswerEn(e.target.value);
              }}
            />
          </div>
          <button type="submit">გაგზავნა</button>
        </form>
      )}
    </>
  );
}
