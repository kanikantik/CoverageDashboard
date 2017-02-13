using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CoverageDashboard.Application.Projects.Dto;
using CoverageDashboard.Mongo.Collections;

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
                cfg.CreateMap<Project, ProjectInputDto>().ReverseMap();
                cfg.CreateMap<Project, ProjectViewDto>().ReverseMap();
               //.ForMember(dest => dest.Id, opts => opts.MapFrom(src => src.Id.ToString()))
            });

            Mapper = config.CreateMapper();
        }
    }
}