import { Container, Modal } from "@components/global";
import { Exercise } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Exercises() {
  const [editId, setEditId] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExerciseVisible, setNewExerciseVisible] = useState(false);
  const [name, setName] = useState<string>("");
  const [sets, setSets] = useState(0);
  const [setList, setSetList] = useState<
    {
      type: "rep" | "time";
      value: number;
    }[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ls = JSON.parse(localStorage.getItem("exercises") ?? "[]");
      setExercises(ls);
      if (ls.length === 0) {
        localStorage.setItem("exercises", JSON.stringify([]));
      }
    }
  }, []);

  useEffect(() => {
    if (!newExerciseVisible) {
      setName("");
      setSets(0);
      setSetList([]);
    }
  }, [newExerciseVisible]);

  const transition = "transition ease-in duration-200";

  return (
    <>
      <Head>
        <title>Lifts of the North Star</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-24">
        <Container>
          <div className="mb-4">
            <button
              className={`${transition} mr-4 border border-slate-900/10 dark:border-slate-100/10 rounded-md px-6 py-3 hover:-translate-y-1`}
              onClick={() => setNewExerciseVisible(true)}
            >
              <i className="fa-solid fa-dumbbell"></i> <strong>Add new</strong>
            </button>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {exercises.map(({ id, name: workoutName, sets: exerciseSets }) => {
              return (
                <li
                  key={id}
                  className="border border-slate-900/10 dark:border-slate-100/10 rounded-md px-6 py-3"
                >
                  <div className="w-full flex items-end justify-end">
                    <button
                      className="text-slate-900 dark:text-slate-100 hover:text-blue-500 dark:hover:text-blue-500"
                      onClick={() => {
                        setName(workoutName);
                        setSets(Object.keys(exerciseSets).length);
                        setSetList(
                          Object.keys(exerciseSets).map((set) => ({
                            type: exerciseSets[set].type,
                            value: exerciseSets[set].value,
                          }))
                        );
                        setEditId(id);
                        setNewExerciseVisible(true);
                      }}
                    >
                      <i className="fa-solid fa-edit"></i>
                    </button>
                    <button
                      onClick={() => {
                        const newExercises = [...exercises];
                        newExercises.splice(
                          newExercises.findIndex((e) => e.id === id),
                          1
                        );
                        setExercises(newExercises);
                        localStorage.setItem(
                          "exercises",
                          JSON.stringify(newExercises)
                        );
                      }}
                      className="ml-4 text-slate-900 dark:text-slate-100 hover:text-red-500 dark:hover:text-red-500"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                  <strong>Name:</strong> {workoutName}
                  <br />
                  <strong>Sets:</strong>
                  <br />
                  {Object.keys(exerciseSets).map((set) => {
                    return (
                      <div key={set}>
                        <>
                          {exerciseSets[set].value} {exerciseSets[set].type}
                        </>
                      </div>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        </Container>
      </main>
      <Modal visible={newExerciseVisible} setVisible={setNewExerciseVisible}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold  mb-4">Add new exercise</h1>
          <form
            className="flex flex-col justify-center items-start"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="border border-slate-900/10 dark:border-slate-100/10 rounded-md px-6 py-3 mb-4"
              value={name}
              onChange={(e) => setName(e.target.value ?? "")}
            />
            <div className="mb-2">
              {[...Array(sets)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-center items-start w-full"
                >
                  <label htmlFor={`set-${i}`} className="mb-2">
                    Set {i + 1}
                  </label>
                  <input
                    defaultValue={0}
                    value={setList[i]?.value}
                    onChange={(e) => {
                      const newList = [...setList];
                      newList[i].value = parseInt(e.target.value || "0");
                      setSetList(newList);
                    }}
                    placeholder="Reps/ Time"
                    type="number"
                    name={`set-${i}`}
                    id={`set-${i}`}
                    className="border border-slate-900/10 dark:border-slate-100/10 rounded-md px-6 py-3 mb-4"
                  />
                  <label htmlFor="set-type" className="mb-2">
                    Set {i + 1} Type
                  </label>
                  <select
                    name={`set-${i}-type`}
                    id={`set-${i}-type`}
                    className="border border-slate-900/10 dark:border-slate-100/10 rounded-md px-6 py-3 mb-4"
                    value={setList[i]?.type}
                    onChange={(e) => {
                      const newList = [...setList];
                      newList[i].type = e.target.value as "rep" | "time";
                      setSetList(newList);
                    }}
                  >
                    <option value="rep">Rep</option>
                    <option value="time">Time</option>
                  </select>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <button
                className={`${transition} mr-4 border border-slate-900/10 dark:border-slate-100/10 rounded-md px-6 py-3 hover:-translate-y-1`}
                onClick={() => {
                  setSets(sets + 1);
                  setSetList([...setList, { value: 0, type: "rep" }]);
                }}
              >
                Add Set
              </button>
              {sets > 0 && (
                <button
                  className={`${transition} border border-slate-900/10 dark:border-slate-100/10 rounded-md px-6 py-3 hover:-translate-y-1`}
                  onClick={() => {
                    setSets(sets - 1);
                    setSetList(setList.slice(0, -1));
                  }}
                >
                  Remove Set
                </button>
              )}
            </div>

            {editId ? (
              <button
                className={`${transition} border border-slate-900/10 dark:border-slate-100/10 rounded-md px-6 py-3 hover:-translate-y-1`}
                onClick={() => {
                  const newExercises = exercises.map((exercise) => {
                    if (exercise.id === editId) {
                      return {
                        ...exercise,
                        name,
                        sets: setList.reduce(
                          (acc, { type, value }, index) => ({
                            ...acc,
                            [index]: {
                              type,
                              value,
                            },
                          }),
                          {} as {
                            [key: string]: {
                              type: "rep" | "time";
                              value: number;
                            };
                          }
                        ),
                      };
                    } else {
                      return exercise;
                    }
                  });
                  setExercises(newExercises);
                  if (typeof window !== "undefined") {
                    localStorage.setItem(
                      "exercises",
                      JSON.stringify(newExercises)
                    );
                  }
                  setEditId("");
                  setNewExerciseVisible(false);
                }}
              >
                Save Edit
              </button>
            ) : (
              <button
                className={`${transition} border border-slate-900/10 dark:border-slate-100/10 rounded-md px-6 py-3 hover:-translate-y-1`}
                onClick={() => {
                  const id = uuidv4();
                  const newExercises = [
                    ...exercises,
                    {
                      id,
                      name,
                      sets: setList.reduce(
                        (acc, { type, value }, index) => ({
                          ...acc,
                          [index]: {
                            type,
                            value,
                          },
                        }),
                        {} as {
                          [key: string]: {
                            type: "rep" | "time";
                            value: number;
                          };
                        }
                      ),
                    },
                  ];
                  setExercises(newExercises);
                  if (typeof window !== "undefined") {
                    localStorage.setItem(
                      "exercises",
                      JSON.stringify(newExercises)
                    );
                  }
                  setNewExerciseVisible(false);
                }}
              >
                <i className="fa-solid fa-dumbbell"></i>{" "}
                <strong>Add new</strong>
              </button>
            )}
          </form>
        </div>
      </Modal>
    </>
  );
}
