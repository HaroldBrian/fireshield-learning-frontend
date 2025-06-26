import { blogs } from "../data";
import BlogCard from "./BlogCard";

const Blog = () => {
  return (
    <section id="blog" className="py-10 lg:py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-md border border-primary bg-primary/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              Blog cybersécurité
            </span>
            <h2 className="my-4 text-3xl font-medium capitalize text-default-950">
              Actualités et conseils en sécurité informatique
            </h2>
            <p className="text-base">
              Restez informé des dernières tendances, bonnes pratiques et
              retours d&apos;expérience en cybersécurité grâce à nos articles
              rédigés par des experts.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog, idx) => (
            <BlogCard blog={blog} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
