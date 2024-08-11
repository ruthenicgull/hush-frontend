import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-24 lg:py-32 dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Learn More About Hush
        </h1>
        <p className="mt-5 text-xl text-muted-foreground">
          Discover how Hush helps college students share their experiences and
          connect with each other in a secure, anonymous environment.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Anonymous Sharing</h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-300">
            Share your experiences, thoughts, and questions without revealing
            your identity. Hush ensures your privacy while fostering open
            communication.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">College Verification</h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-300">
            Only verified college students can join Hush, ensuring that you
            connect with genuine peers from your institution.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">Secure Environment</h2>
          <p className="mt-4 text-muted-foreground dark:text-gray-300">
            Hush uses state-of-the-art security measures to protect your data
            and ensure a safe space for all users.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">1. Sign Up</h3>
            <p className="mt-4 text-muted-foreground dark:text-gray-300">
              Create an account using your verified college email address to
              join the Hush community.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">2. Share Anonymously</h3>
            <p className="mt-4 text-muted-foreground dark:text-gray-300">
              Post your thoughts, questions, and experiences anonymously. Engage
              with others through comments and upvotes.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">3. Connect with Peers</h3>
            <p className="mt-4 text-muted-foreground dark:text-gray-300">
              Find and follow topics that interest you. Connect with peers who
              share similar experiences and interests.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">4. Stay Secure</h3>
            <p className="mt-4 text-muted-foreground dark:text-gray-300">
              Enjoy a secure and private environment where you can freely
              express yourself without fear of judgment.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Button size="lg" onClick={() => navigate("/signup")}>
          Join Hush Today
        </Button>
      </div>
    </div>
  );
}
