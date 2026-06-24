import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const searchSchema = z.object({
  query: z.string().trim().min(1, "Введіть назву фільму"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  const submit = handleSubmit((data) => onSearch(data.query));

  const clear = () => {
    reset({ query: "" });
    onClear();
  };

  return (
    <form onSubmit={submit} className="mb-6 flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          {...register("query")}
          placeholder="Пошук фільму..."
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Шукати
        </button>
        <button
          type="button"
          onClick={clear}
          className="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-300"
        >
          Скинути
        </button>
      </div>
      {errors.query && (
        <p className="text-sm text-red-500">{errors.query.message}</p>
      )}
    </form>
  );
}

export default SearchBar;
