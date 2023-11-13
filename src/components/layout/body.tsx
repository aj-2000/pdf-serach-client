import ResultTile from "../ui/result-tile";

export default function Body() {
  return (
    <div className="flex">
      <div className="flex grow flex-col gap-2 p-2">
        <span>Top Pages</span>
        <ResultTile kind="page" />
      </div>
      <div className="flex grow flex-col gap-2 p-2">
        <span>Top Documents</span>
        <ResultTile kind="doc" />
      </div>
    </div>
  );
}
