import type { ExtraNote } from "@/types";
import ExtraInfoContent from "./ExtraInfoContent";
import { convertNoteTypeENtoJP, type NoteTypeEN } from "@/utils/noteTypeMapper";

type Props = {
  extraNotes: ExtraNote[];
};

const CardExtraInfo = ({ extraNotes }: Props) => {
  return (
    <div className="border-gray-400 border rounded-lg flex flex-col shadow-lg px-2 py-1 mb-4 max-w-[600px] mx-auto">
      {extraNotes.map((extraNote, index) => (
        <ExtraInfoContent
          key={index}
          label={convertNoteTypeENtoJP(extraNote.noteType as NoteTypeEN)}
          content={extraNote.content}
        />
      ))}
    </div>
  );
};

export default CardExtraInfo;
