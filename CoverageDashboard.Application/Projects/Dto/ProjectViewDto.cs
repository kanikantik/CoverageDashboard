﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace CoverageDashboard.Application.Projects.Dto
{
    public class ProjectViewDto
    {
        public int Id { get; set; }


        public string Code { get; set; }

        public string Description { get; set; }


        public string AssignedTo { get; set; }
    }
}