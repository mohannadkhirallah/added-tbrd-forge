import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const [query, setQuery] = useState("");

  // Mock search results
  const results = query ? [
    {
      chunk_id: "1",
      section_key: "functional_requirements",
      content: "The system shall provide user authentication using OAuth 2.0 protocol with support for social login providers including Google and Microsoft.",
      relevance_score: 0.95,
    },
    {
      chunk_id: "2",
      section_key: "non_functional_requirements",
      content: "The system must handle 10,000 concurrent users with response times under 200ms for 95% of requests.",
      relevance_score: 0.87,
    },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground">
          Search across all case documents and TBRDs
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Search Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for requirements, features, or specifications..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {query && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Found {results.length} results for "{query}"
          </p>
          {results.map((result) => (
            <Card key={result.chunk_id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary capitalize">
                    {result.section_key.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Relevance: {(result.relevance_score * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-sm">{result.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
