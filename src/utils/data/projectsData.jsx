import ReactProject from "../../assets/images/projet1.jpeg";
import LaravelProject from '../../assets/images/projet2.jpeg';
import ExpressJsProject from '../../assets/images/projet3.jpeg';
import AndroidProject from '../../assets/images/projet4.jpeg';
import FlutterProject from '../../assets/images/projet5.jpeg';
import PythonProject from '../../assets/images/projet6.jpeg';

  const projectsData = [
  {
    id: 1,
    title: 'Projet React',
    category: 'React',
    type: 'Gratuit',
    imageUrl: ReactProject,
    downloadLink: 'https://example.com/react-project-download',
    description: 'Un projet React moderne avec des fonctionnalités avancées.',
    features: ['Api,Vente des produits', 'Payer des taxes', 'Envoyer un colis', 'Fais un gsm']
  },
  {
    id: 2,
    title: 'Projet Laravel',
    category: 'Laravel',
    type: 'Payant',
    imageUrl: LaravelProject,
    downloadLink: 'https://example.com/laravel-project-download',
    description: 'Une application web robuste construite avec Laravel.',
    features: ['Api,Vente des produits', 'Payer des taxes', 'Envoyer un colis', 'Fais un gsm']
  },
  {
    id: 3,
    title: 'Projet Flutter',
    category: 'Flutter',
    type: 'Gratuit',
    imageUrl: FlutterProject,
    downloadLink: 'https://example.com/flutter-project-download',
    description: 'Une application mobile cross-platform développée avec Flutter.',
    features: ['Api,Vente des produits', 'Payer des taxes', 'Envoyer un colis', 'Fais un gsm']
  },
  {
    id: 4,
    title: 'Projet Python',
    category: 'Python',
    type: 'Gratuit',
    imageUrl: PythonProject,
    downloadLink: 'https://example.com/python-project-download',
    description: 'Un script Python puissant pour l\'analyse de données.',
    features: ['Api,Vente des produits', 'Payer des taxes', 'Envoyer un colis', 'Fais un gsm']
  },
  {
    id: 5,
    title: 'Projet Express.js',
    category: 'Express.js',
    type: 'Gratuit',
    imageUrl: ExpressJsProject,
    downloadLink: 'https://example.com/expressjs-project-download',
    description: 'Une API RESTful construite avec Express.js et Node.js.',
    features: ['Api,Vente des produits', 'Payer des taxes', 'Envoyer un colis', 'Fais un gsm']
  },
  {
    id: 6,
    title: 'Projet Android',
    category: 'Android',
    type: 'Gratuit',
    imageUrl: AndroidProject,
    downloadLink: 'https://example.com/android-project-download',
    description: 'Une application Android native avec des fonctionnalités modernes.',
    features: ['Api,Vente des produits', 'Payer des taxes', 'Envoyer un colis', 'Fais un gsm']
  },
];

const categories = ['Toutes', 'React', 'Laravel', 'Python', 'Java', 'Fullstack', 'Frontend', 'Backend', 'PHP', 'Android', 'Flutter', 'React Native', 'Express.js', 'Node.js'];


export {projectsData, categories}