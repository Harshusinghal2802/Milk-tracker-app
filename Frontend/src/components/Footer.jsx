export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h1 className="text-3xl font-bold text-orange-400 mb-4">
            RecipeHub
          </h1>

          <p className="text-gray-400 leading-7">
            Discover delicious recipes from around the world.
            Cook with passion and share happiness.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-orange-400 cursor-pointer">
              Home
            </li>

            <li className="hover:text-orange-400 cursor-pointer">
              Recipes
            </li>

            <li className="hover:text-orange-400 cursor-pointer">
              About
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Contact
          </h2>

          <p className="text-gray-400">
            Email: support@recipehub.com
          </p>

          <p className="text-gray-400 mt-2">
            Phone: +91 9876543210
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-gray-400">
        © 2026 RecipeHub. All Rights Reserved.
      </div>
    </footer>
  );
}