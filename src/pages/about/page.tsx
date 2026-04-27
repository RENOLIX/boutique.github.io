import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";

const TEAM = [
  {
    name: "Yasmine Benali",
    role: "Fondatrice & Directrice creative",
    img: "https://images.unsplash.com/photo-1607997637503-d4d8dee871e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Riad Aouad",
    role: "Responsable collections",
    img: "https://images.unsplash.com/photo-1559038217-3fb2db6186f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Nadia Cherif",
    role: "Styliste & modeliste",
    img: "https://images.unsplash.com/photo-1765229276796-c93c73cc3f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

const VALUES = [
  {
    title: "Authenticite",
    desc: "Chaque collection melange lignes contemporaines, douceur visuelle et details soignes pour proposer une mode simple et feminine.",
  },
  {
    title: "Qualite",
    desc: "Nous selectionnons des matieres agreables a porter, des coupes nettes et des finitions propres pour des pieces qui durent.",
  },
  {
    title: "Accessibilite",
    desc: "Notre objectif est de proposer une mode soignee a un prix juste, pensee pour le quotidien et les envies de la cliente algerienne.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="relative h-[55vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1772570824145-e996a55204fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
          alt="A propos"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[#351f2a]/50 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/60">
              Notre histoire
            </p>
            <h1 className="font-serif text-4xl font-bold text-white md:text-6xl">
              A propos de{" "}
              <span className="font-brand text-5xl font-normal md:text-7xl">
                Mina
              </span>{" "}
              Boutique
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Depuis 2021
            </p>
            <h2 className="mb-6 font-serif text-3xl font-bold leading-tight">
              Une boutique nee a Alger,
              <br />
              pour le quotidien feminin
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              <span className="font-brand text-2xl leading-none text-primary">
                Mina
              </span>{" "}
              Boutique est nee d&apos;une idee simple : proposer une mode
              elegante, actuelle et facile a porter, sans compliquer l&apos;achat
              ni les prix.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Nos collections sont pensees a Alger pour une clientele qui cherche
              de belles pieces, des coupes propres et une experience d&apos;achat
              rassurante du premier clic jusqu&apos;a la livraison.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Nous privilegions les series maitrisees, les finitions soignees et
              une palette douce ou le blanc rencontre le rose avec naturel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1603798125914-7b5d27789248?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700"
              alt="Atelier Mina Boutique"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="marble-bg px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="mb-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Ce qui nous guide
            </p>
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              Nos valeurs
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/75 p-6 backdrop-blur"
              >
                <div className="mb-4 h-px w-8 bg-foreground" />
                <h3 className="mb-2 font-serif text-lg font-bold">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Derriere Mina Boutique
          </p>
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            L&apos;equipe
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-4 aspect-square overflow-hidden bg-muted">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <h3 className="font-serif text-lg font-bold">{member.name}</h3>
              <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-foreground px-4 py-16 text-center text-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Decouvrez la collection
          </h2>
          <p className="mb-8 text-sm text-background/70">
            Livraison dans Alger. Paiement a la livraison.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-background px-8 py-4 text-xs font-semibold uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
          >
            Explorer la boutique <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
