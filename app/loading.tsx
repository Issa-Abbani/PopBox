import Loader from "@/components/layout/Loader";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] gap-4 items-center justify-center px-6">
        <Loader/>
        Loading PopBox...
    </div>
  );
}
