interface HeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function Header({ heading, text, children }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
