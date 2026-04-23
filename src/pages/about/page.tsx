import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";

const TEAM = [
  {
    name: "Yasmine Benali",
    role: "Fondatrice & Directrice Créative",
    img: "https://images.unsplash.com/photo-1607997637503-d4d8dee871e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Riad Aouad",
    role: "Responsable Collections",
    img: "https://images.unsplash.com/photo-1559038217-3fb2db6186f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    name: "Nadia Cherif",
    role: "Styliste & Modéliste",
    img: "https://images.unsplash.com/photo-1765229276796-c93c73cc3f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

const VALUES = [
  {
    title: "Authenticité",
    desc: "Chaque collection mêle lignes contemporaines et sensibilité locale pour proposer une mode simple, élégante et ancrée dans son époque.",
  },
  {
    title: "Qualité",
    desc: "Nous sélectionnons des matières agréables à porter et des coupes justes, pour des vêtements qui tiennent dans le temps.",
  },
  {
    title: "Accessibilité",
    desc: "Notre objectif est de proposer une mode soignée à un prix juste, adaptée à la clientèle algérienne et à son quotidien.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="relative h-[55vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1772570824145-e996a55204fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
          alt="À propos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-3">
              Notre histoire
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white text-balance">
              À Propos de MAISON
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
              Depuis 2021
            </p>
            <h2 className="font-serif text-3xl font-bold mb-6 leading-tight">
              Une marque née à Alger,
              <br />
              pour le quotidien
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              MAISON est née d'une idée simple : proposer une mode élégante,
              actuelle et facile à porter, sans compliquer l'achat ni les prix.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Nos collections sont pensées à Alger pour une clientèle qui cherche
              de belles pièces, des coupes propres et une expérience d'achat claire.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nous privilégions les séries maîtrisées, les finitions soignées et la
              livraison locale avec paiement à la livraison.
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
              alt="Notre atelier"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="marble-bg py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
              Ce qui nous guide
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Nos valeurs</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/75 backdrop-blur p-6"
              >
                <div className="w-8 h-px bg-foreground mb-4" />
                <h3 className="font-serif text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
            Derrière MAISON
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold">L'équipe</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="aspect-square overflow-hidden mb-4 bg-muted">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="font-serif text-lg font-bold">{member.name}</h3>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-foreground text-background py-16 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl font-bold mb-4">
            Découvrez la collection
          </h2>
          <p className="text-background/60 text-sm mb-8">
            Livraison dans Alger. Paiement à la livraison.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-background text-background text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-background hover:text-foreground transition-colors"
          >
            Explorer la boutique <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
