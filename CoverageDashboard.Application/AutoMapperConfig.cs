using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CoverageDashboard.Application.Projects.Dto;

namespace CoverageDashboard.Application
{
    public static class AutoMapperConfig
    {
        /// <summary>
        /// Gets or sets the mapper.
        /// </summary>
        /// <value>
        /// The _ mapper.
        /// </value>
        public static IMapper Mapper { get; set; }

        /// <summary>
        /// Registers the mappings.
        /// </summary>
        public static void RegisterMappings()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CoverageDashboard.Mongo.Collections.Project, ProjectInputDto>().ReverseMap();
                cfg.CreateMap<CoverageDashboard.Mongo.Collections.Project, ProjectViewDto>().ReverseMap();
            });

            Mapper = config.CreateMapper();
        }
    }
}