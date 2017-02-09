using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoverageDashboard.Application.AutoMapper
{
    public class EntityMapper : IMapping
    {
        public TDestination Map<TSource, TDestination>(TSource source)
        {
            return Mapper.Map<TDestination>(source);
        }
    }
}
