import { Combobox, Option } from "../../ui/combo-box";

const modes: Option[] = [
  { value: "tfidf", label: "TF-IDF" },
  { value: "doc2vec", label: "Doc2Vec" },
  { value: "lsi", label: "LSI" },
];
export default function ModeInput() {
  return (
    <>
      <Combobox options={modes} />{" "}
    </>
  );
}
