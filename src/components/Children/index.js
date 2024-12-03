// common things about these children:
// 1. returns a editable children if in edit mode
// 2. padding and size
// 3. prevent editing if in edit mode
import React from "react";

import { useRecoilValue } from "recoil";
import { editableState } from "../../recoil/atoms";

import { TextEditorInput } from "./TextEditor/TextEditorInput";
import MemeDisplay from "./Meme";
import TodoList from "./TodoBoard";
import DigitalClock from "./Clock";
import WebpagePreview from "./WebPreview";


function Child({ type }) {
  const editable = useRecoilValue(editableState);

  return (
    <div className={`${editable && "pointer-events-none"} w-full h-full`}>
      {type === "text" ? (
        <TextEditorInput />
      ) : type === "meme" ? (
        <MemeDisplay />
      ) : type === "todo" ? (
        <TodoList />
      ) : type === "clock" ? (
        <DigitalClock />
      ) :  type === "web" ? (
        <WebpagePreview />
      ) : null}
    </div>
  );
}

export default Child;
