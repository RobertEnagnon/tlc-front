// import './Premium.css'
// import React, { useState } from 'react';
// import { Box, Typography, Button, Switch } from '@mui/material';

// const Premium = () => {
//   const [isMonthlySubscription, setIsMonthlySubscription] = useState(true);

//   const advantagesMonthly = [
//     'Accès à du contenu exclusif chaque semaine',
//     'Téléchargement des vidéos',
//     'Téléchargement des sources de projets',
//     'Rejoindre communauté Telegram et Discord',
//     'discuter directement avec les formateurs '
//   ];

//   const advantagesAnnual = [
//     ...advantagesMonthly,
//     'Réduction de 50% sur les formations premium',
//     'Accès prioritaire au support technique',
//   ];

//   const handleChangeSubscriptionType = () => {
//     setIsMonthlySubscription((prevValue) => !prevValue);
//   };

//   return (
//     <Box>
//       {/* Bannière */}
//       <Box
//       className='banniere'
//         sx={{
//           py: 10,
//         }}
//         px={{lg:40,md:20,sm:10,xs:5}}
//       >
//         <Typography variant="h3" gutterBottom>
//           Devenir Premium
//         </Typography>
//         <Typography fontSize={24} variant="body1" gutterBottom>
//           {/* Devenir premium sur The Legend Code, c'est soutenir la création de nouveaux contenus chaque semaine et accéder à du contenu exclusif pour apprendre et s'améliorer (comme le téléchargement des vidéos et des sources). */}
//           Devenir Premium sur The Legend Code offre une expérience 
//           enrichissante et exclusive. En plus de soutenir la création 
//           de nouveaux contenus chaque semaine, les membres Premium bénéficient d'un accès 
//           privilégié à des contenus exclusifs tels que des vidéos téléchargeables et des 
//           sources de projets. Rejoignez notre communauté sur Telegram et discutez directement 
//           avec les formateurs en inbox. Partagez vos questions avec d'autres membres et trouvez 
//           des réponses, tout en profitant d'avantages spéciaux comme des réductions sur les 
//           formations premium et un accès prioritaire au support technique. 
//           {/* Plongez dans un voyage d'apprentissage avancé 
//           et épanouissant en devenant membre Premium de The Legend Code. */}
//         </Typography>
//       </Box>

//       <Box display={'flex'} justifyContent={'space-around'} alignItems={'flex-start'} flexWrap={'wrap'}>
//         <Box>
//           {/* Sélection du type d'abonnement */}
//           <Box mt={4} display="flex" justifyContent="center" alignItems="center">
//             <Typography variant="h5" sx={{ mr: 2 }}>
//               Abonnement :
//             </Typography>
//             <Switch checked={isMonthlySubscription} onChange={handleChangeSubscriptionType} />
//             <Typography variant="body1" sx={{ ml: 2 }}>
//               {isMonthlySubscription ? 'Mensuel' : 'Annuel'}
//             </Typography>
//           </Box>

//           {/* Avantages de chaque type d'abonnement */}
//           <Box mt={4} display="flex" justifyContent="center">
//             <Box
//               sx={{
//                 backgroundColor: '#f5f5f5',
//                 borderRadius: '8px',
//                 padding: '20px',
//                 maxWidth: '600px',
//                 width: '100%',
//               }}
//             >
//               <Typography variant="h5" gutterBottom>
//                 Avantages :
//               </Typography>
//               <ul style={{ listStyleType: 'none', padding: 0 }}>
//                 {isMonthlySubscription
//                   ? advantagesMonthly.map((advantage) => (
//                       <li key={advantage}>
//                         <Typography variant="body1" gutterBottom>
//                           &#10003; {advantage}
//                         </Typography>
//                       </li>
//                     ))
//                   : advantagesAnnual.map((advantage) => (
//                       <li key={advantage}>
//                         <Typography variant="body1" gutterBottom>
//                           &#10003; {advantage}
//                         </Typography>
//                       </li>
//                     ))}
//               </ul>
//               <Typography variant="h5" gutterBottom mt={4}>
//                 {isMonthlySubscription ? 'Tarif : 5€ par mois' : 'Tarif : 50€ par an'}
//               </Typography>
//               <Box mt={2} display="flex" justifyContent="center">
//                 <Button
//                   variant="contained"
//                   className="btnFirst"
//                   sx={{
//                     padding: { md: '15px 60px' },
//                     margin: '20px 0',
//                   }}
//                 >
//                   Devenir Premium
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//         </Box>

//         {/* Section explicative */}
//         <Box pt={{md:13,sm:5}}  display="flex" justifyContent="center" className="section" >
//           <Box
//             sx={{
//               maxWidth: '600px',
//               width: '90%',
//             }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Pourquoi cette offre ?
//             </Typography>
//             <Typography variant="body1" gutterBottom pb={2}>
//             Chez The Legend Code, notre mission est de rendre le savoir accessible au plus grand nombre. C'est pourquoi nous mettons 
//             à disposition un vaste contenu gratuit et public, permettant à chacun de se perfectionner dans divers domaines numériques.
//             </Typography>

//             <Typography variant="body1" gutterBottom pb={2}>
//               En devenant membre Premium, vous bénéficiez non seulement d'un accès exclusif à des contenus avancés, tels que des vidéos 
//               téléchargeables et des sources de projets, mais vous soutenez également la création continue de ressources éducatives de qualité. 
//               Vous avez l'opportunité unique de rejoindre une communauté dynamique sur Telegram, où vous pourrez interagir
//               directement avec nos formateurs, partager vos questions avec d'autres membres et trouver des réponses enrichissantes.
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               En optant pour un abonnement Premium, vous investissez dans votre propre développement professionnel et contribuez 
//               à l'épanouissement de notre plateforme, tout en bénéficiant d'avantages spéciaux tels que des réductions sur les formations premium 
//               et un support technique prioritaire. Ensemble, construisons un environnement d'apprentissage collaboratif et inspirant au sein de The Legend Code.
//           </Typography>
//             <Typography variant="body1" gutterBottom>
//             Cependant, la création de tutoriels de qualité exige un engagement considérable de notre équipe, impliquant des heures de préparation, 
//             d'enregistrement et de montage chaque semaine. Afin de garantir la pérennité de notre plateforme et de maintenir un niveau élevé de contenu gratuit, 
//             nous proposons également des options payantes pour les membres Premium.
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Premium;


import React, { useState } from 'react';
import { Box, Container, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'motion/react';

import PremiumBanner from '../../components/PremiumBanner/PremiumBanner';
import SubscriptionToggle from '../../components/SubscriptionToggle/SubscriptionToggle';
import PricingCard from '../../components/PricingCard/PricingCard';
import WhyPremium from '../../components/WhyPremium/WhyPremium';

const Premium = () => {
  const [isMonthlySubscription, setIsMonthlySubscription] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const advantagesMonthly = [
    'Accès à du contenu exclusif chaque semaine',
    'Téléchargement des vidéos',
    'Téléchargement des sources de projets',
    'Rejoindre communauté Telegram et Discord',
    'Discuter directement avec les formateurs',
    'Mentorat personnalisé trimestriel',
    'Accès à des webinaires mensuels exclusifs',
    'Badge "Premium" sur le profil',
  ];

  const advantagesAnnual = [
    ...advantagesMonthly,
    'Réduction de 50% sur les formations premium',
    'Accès prioritaire au support technique',
    'Invitation à des événements exclusifs',
    'Accès à la bibliothèque complète des archives',
    
  ];

  const handleChangeSubscriptionType = () => {
    setIsMonthlySubscription((prevValue) => !prevValue);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <PremiumBanner />
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Choisissez votre plan Premium
          </Typography>
          <SubscriptionToggle
            isMonthlySubscription={isMonthlySubscription}
            onChange={handleChangeSubscriptionType}
          />
        </motion.div>

        <Box sx={{ mt: 6, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4, justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PricingCard
              title={isMonthlySubscription ? "Abonnement Mensuel" : "Abonnement Annuel"}
              price={isMonthlySubscription ? "5€" : "50€"}
              period={isMonthlySubscription ? "par mois" : "par an"}
              features={isMonthlySubscription ? advantagesMonthly : advantagesAnnual}
              isRecommended={!isMonthlySubscription}
            />
          </motion.div>
        </Box>

        <Box sx={{ mt: 8 }}>
          <WhyPremium />
        </Box>
      </Container>
    </Box>
  );
};

export default Premium;

