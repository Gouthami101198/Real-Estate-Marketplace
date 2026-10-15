import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Phone, 
  Mail, 
  Award, 
  ShieldCheck, 
  Languages, 
  Building2, 
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const AgentsPage = () => {
  const { agents, navigateTo, viewAgentDetail } = useRealEstate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 pt-24 pb-20 transition-colors duration-300">
      
      {/* Header */}
      <div className="bg-navy-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
            Private Client Advisors
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            World-Class Real Estate Representation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our trusted advisors represent discerning buyers, tech entrepreneurs, and international family offices across the most competitive luxury markets.
          </p>
        </div>
      </div>

      {/* Agents Roster */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              whileHover={{ y: -6 }}
              onClick={() => viewAgentDetail(agent.id)}
              className="bg-white dark:bg-navy-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 hover:border-gold-500/50 shadow-luxury hover:shadow-luxury-hover transition-all cursor-pointer group flex flex-col sm:flex-row"
            >
              {/* Agent Portrait */}
              <div className="sm:w-2/5 h-72 sm:h-auto relative overflow-hidden bg-navy-950 shrink-0">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy-950/85 backdrop-blur-md border border-gold-400/40 text-gold-300 text-[11px] font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span>{agent.rating} ({agent.reviewsCount})</span>
                </div>
              </div>

              {/* Agent Info */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gold-600 dark:text-gold-400 font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Verified Elite Partner</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-navy-950 dark:text-white group-hover:text-gold-600 transition-colors">
                    {agent.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {agent.title} • {agent.agency}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mt-3 leading-relaxed">
                    {agent.bio}
                  </p>
                </div>

                {/* Specialties & Metrics */}
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {agent.specialties.slice(0, 2).map((spec, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-[10px] font-semibold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Career Sales</span>
                      <strong className="text-navy-950 dark:text-white font-bold">{agent.salesVolume}</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Active Listings</span>
                      <strong className="text-navy-950 dark:text-white font-bold">{agent.listingsCount} Estates</strong>
                    </div>

                    <span className="text-xs font-semibold text-gold-600 dark:text-gold-400 group-hover:text-gold-700 flex items-center gap-1">
                      View Profile <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
