export type Logo2Data = {
  alt: string;
  imgSrc: string;
};
/** A logo. */
export default function Logo2({ d, cids }: { d: Logo2Data; cids: string[] }) {
  return (
    <img data-cid={cids[0]} className="w-7 h-7 block opacity-72 max-w-full overflow-clip [filter:grayscale(1)]" data-component="image" alt={d.alt} src={d.imgSrc} />
  );
}
