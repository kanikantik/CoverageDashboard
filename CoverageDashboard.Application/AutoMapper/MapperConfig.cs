using AutoMapper;
using CoverageDashboard.Application;
using CoverageDashboard.Application.Projects.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoverageDashboard.Mongo.Collections;

namespace CoverageDashboard.Application.AutoMapper
{
    public static class MapperConfig
    {
        public static void RegisterMapping()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<CoverageDashboard.Mongo.Collections.Project, ProjectInputDto>().ReverseMap());
            Mapper.Initialize(cfg => cfg.CreateMap<CoverageDashboard.Mongo.Collections.Project, ProjectViewDto>().ReverseMap());

            Mapper.Configuration.AssertConfigurationIsValid();

           


            //var config = new MapperConfiguration(cfg =>
            //{
            //    cfg.CreateMap<CoverageDashboard.Mongo.Collections.Project, ProjectInputDto>().ReverseMap();
            //    cfg.CreateMap<CoverageDashboard.Mongo.Collections.Project, ProjectViewDto>().ReverseMap();
            //});

            //Mapper = config.CreateMapper();

            //Mapper.AssertConfigurationIsValid();
        }
    }
}
