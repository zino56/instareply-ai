import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <SearchX className="h-10 w-10 text-primary" aria-hidden="true" />
        </div>

        <p className="mb-2 font-poppins text-7xl font-extrabold tracking-tight text-foreground">
          404
        </p>

        <h1 className="font-poppins text-2xl font-bold text-foreground md:text-3xl">
          Page not found
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8">
          <Button
            asChild
            className="h-12 px-8 text-base font-poppins font-bold shadow-button transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,241,0,0.3)]"
          >
            <Link to="/">Back to homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
