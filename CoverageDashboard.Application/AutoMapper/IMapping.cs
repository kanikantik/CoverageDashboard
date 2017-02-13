namespace CoverageDashboard.Application.AutoMapper
{
    public interface IMapping
    {
        TDestination Map<TSource, TDestination>(TSource source);
    }
}