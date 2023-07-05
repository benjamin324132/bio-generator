"use client";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { useState } from "react";
import { formSchema } from "@/validators/formValidator";
import { Copy, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./ui/use-toast";

export const revalidate = 0;

const GenerateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bios, setBios] = useState<any[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
      type: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post("/api/generate", values);
      if (Array.isArray(data.choices) && data.choices[0]) {
        setBios(data.choices);
      } else {
        toast({
          title: "Ooops algo salio mal",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Ooops algo salio mal",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-20 pb-12 max-w-[40rem] mx-auto flex flex-col gap-y-8"
      >
        <h3 className="text-center text-slate-800 font-semibold text-3xl dark:text-white">
          Comienza a generar tus Bios
        </h3>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-lg font-semibold">
                1. Agrega tu el texto para generar
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isLoading}
                  rows={6}
                  className="mt-5 font-semibold placeholder:text-neutral-400 placeholder:font-medium"
                  placeholder="Ej. Licenciado en administracion con 3 años de experinecia liderando equipos de trabajo"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          variant="green"
          size="lg"
          className="text-lg"
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Generar
        </Button>
      </form>
      <div className="max-w-[40rem] mx-auto pb-28">
        {bios.map((bio, index) => {
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className=" text-green-500">Tu bio</CardTitle>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(bio.message.content);
                    toast({
                      title: "Copiado al portapaeles",
                    });
                  }}
                >
                  <Copy className=" w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-medium">{bio.message.content}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Form>
  );
};

export default GenerateForm;
