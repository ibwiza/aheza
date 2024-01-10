import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.jpeg"
      width={30}
      height={30}
      alt="Picture of the author"
      className="rounded-full"
    />
  );
}
