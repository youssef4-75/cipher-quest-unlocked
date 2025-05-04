
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout title="">
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-6 glitch">404</h1>
        <p className="text-xl mb-8">This page has been encrypted and can't be decoded.</p>
        <div className="max-w-md mb-10 p-6 cipher-card">
          <p className="font-mono text-sm mb-2 text-cipher-300">
            01001110 01101111 01110100 00100000 01100110 01101111 01110101 01101110 01100100
          </p>
          <p className="text-xs text-muted-foreground">Binary translation: "Not found"</p>
        </div>
        <Link to="/">
          <Button size="lg">Return to Homepage</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
