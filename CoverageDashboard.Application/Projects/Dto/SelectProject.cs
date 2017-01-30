using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoverageDashboard.Application.Projects.Dto
{
   public class SelectProject
    {
        public int Id { get; set; }

        
        public string Code { get; set; }

        public string Description { get; set; }

       
        public string AssignedTo { get; set; }
    }
}
