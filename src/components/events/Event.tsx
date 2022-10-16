import {
  getDatabase,
  ref,
  remove as dbRemove,
  update,
} from "firebase/database";
import { deleteObject, getStorage, ref as sRef } from "firebase/storage";
import { AiOutlineDelete, AiOutlineEdit } from "solid-icons/ai";
import { Accessor, createSignal, Show } from "solid-js";
import { firebaseClient } from "../../firebase";
import { Modal } from "../Modal";
import { Form } from "../solid-form/Form";
import { Input } from "../solid-form/Input";
import { TextArea } from "../solid-form/TextArea";

interface Props {
  id: string;
  name: string;
  description: string;
  when: string;
  where: string;
  image: string | undefined;
  auth: Accessor<boolean>;
}

type UserInputType = {
  name: string;
  description: string;
  when: string;
  where: string;
  image: File;
};

const Event = (props: Props) => {
  const [edit, setEdit] = createSignal<boolean>(false);
  const [remove, setRemove] = createSignal<boolean>(false);

  const updateDatabase = (
    userInput: UserInputType,
    imagePath: string | null
  ) => {
    const db = getDatabase(firebaseClient);
    update(ref(db, "events/"), {
      [props.id]: { ...userInput, image: imagePath },
    })
      .then(() => {
        alert("Event updated successfully");
        setEdit(false);
      })
      .catch((err) => alert(`FIREBASE ERROR: ${err}`));
  };

  const removeEvent = () => {
    const removeFromDB = () => {
      const db = getDatabase(firebaseClient);
      dbRemove(ref(db, `events/${props.id}`))
        .then(() => {
          alert("Event removed successfully");
          setRemove(false);
        })
        .catch((err) => alert(`FIREBASE ERROR: ${err}`));
    };
    if (props.image) {
      const storage = getStorage(firebaseClient);
      const imagePath = `events/${props.name.toLowerCase()}.png`;
      deleteObject(sRef(storage, imagePath))
        .then(() => removeFromDB())
        .catch((err) => alert(`FIREBASE ERROR: ${err}`));
    } else removeFromDB();
  };

  return (
    <>
      <div class="md:w-2/3 rounded self-center shadow-lg border-2 border-slate-900 bg-slate-300 dark:bg-slate-600 flex flex-col relative my-4">
        <Show when={props.auth()}>
          <div class="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-slate-400 p-2 rounded-full shadow-lg flex flex-row">
            <button class="ml-4 mr-2" onClick={() => setEdit(true)}>
              <AiOutlineEdit size={25} class="fill-black" />
            </button>
            <button class="ml-2 mr-4" onClick={() => setRemove(true)}>
              <AiOutlineDelete size={25} class="fill-black" />
            </button>
          </div>
        </Show>
        <div class="w-full bg-gradient-to-r from-uni-green to-uni-blue rounded-t">
          <p class="text-center p-4 text-slate-100">
            {props.when} @ {props.where}
          </p>
        </div>
        <h2 class="self-center text-2xl sm:text-3xl italic my-4">
          {props.name}
        </h2>
        <Show when={props.image}>
          <img
            src={props.image}
            alt={`${props.name} poster`}
            class="rounded w-2/3 mx-auto"
          />
        </Show>
        <div class="p-4 text-lg text-justify">
          <p>{props.description}</p>
        </div>
      </div>

      <Modal
        isOpen={edit() && props.auth()}
        dimensions="w-2/3 h-2/3"
        close={() => setEdit(false)}
      >
        <Form databaseFunc={updateDatabase}>
          <Input value={props.name} hint="Event name" name="name" />
          <Input value={props.when} hint="When" name="when" />
          <Input value={props.where} hint="Where" name="where" />
          <TextArea
            value={props.description}
            hint="Description"
            name="description"
          />
          <Input value={""} hint="Upload image" name="image" />
          <div class="flex flex-row self-end ">
            <input
              type="submit"
              class="border-2 border-green-500 bg-green-500 text-slate-100 hover:bg-transparent hover:text-green-500 transition-colors ease-linear duration-150 rounded p-4 w-min mr-4 hover:cursor-pointer"
            />
            <input
              type="button"
              value="Cancel"
              class="border-2 border-red-500 bg-red-500 text-slate-100 hover:bg-transparent hover:text-red-500 transition-colors ease-linear duration-150 rounded p-4 w-min hover:cursor-pointer"
              onClick={() => setEdit(false)}
            />
          </div>
        </Form>
      </Modal>

      <Modal
        isOpen={remove() && props.auth()}
        dimensions={"w-max h-max"}
        close={() => setRemove(false)}
      >
        <h2 class="text-2xl w-full text-justify">
          You are about to delete <span class="italic">"{props.name}"</span>
        </h2>
        <p class="text-lg my-4">Do you wish to continue?</p>
        <div class="flex flex-row self-end">
          <button
            onClick={removeEvent}
            class="border-2 border-orange-500 bg-orange-500 text-slate-100 hover:bg-transparent hover:text-orange-500 transition-colors ease-linear duration-150 mr-4 p-4 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => setRemove(false)}
            class="border-2 border-red-500 bg-red-500 text-slate-100 hover:bg-transparent hover:text-red-500 transition-colors ease-linear duration-150 p-4 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Event;
