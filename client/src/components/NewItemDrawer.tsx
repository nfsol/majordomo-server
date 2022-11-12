import { Dispatch, useState } from 'react';
import { TextInput, FileInput, Drawer, Button, Group, JsonInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import Compressor from "compressorjs";
import axios from 'axios';
const NewItemDrawer = ({lastScan,setLastScan}:{lastScan:string|null,setLastScan:Dispatch<string|null>}) => {
  const form = useForm({
    initialValues: {
      upc: '',
      name: '',
      image: null,
      bbDate: ''
    },
  });

  const [upc, setUpc] = useState<string>(String(lastScan));
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [bbDate, setBBDate] = useState<Date | null>(new Date());

  const imageCompress= (img: File) => {
    new Compressor(img, {
      quality: 0.6,
      success(result: File) {
        setImage(result)
        console.log(result)
      },
      error(err) {
        console.log(err.message);
      },
    });
    
  }
  const submitForm = () => {
    const formData = new FormData();
    formData.append("upc",upc);
    formData.append("name",name);
    formData.append("image",image!);
    formData.append("bbDate",bbDate!.toDateString());
    
    axios.post("/product/new", formData);
  }


  return (
    <>
      <Drawer
        opened={true}

        onClose={() => setLastScan(null)}
        title="Add or Update Product"
        padding="xl"
        size="xl"
      >
       <div style={{ maxWidth: 320, margin: 'auto' }}>

       <h2>Scanned UPC:{lastScan ? lastScan : "Error"}</h2>
      <TextInput value={name}label="Product Name" placeholder="Optional" onChange={(event) => setName(event.currentTarget.value)} />
      <FileInput value={image} label="Capture Image" placeholder="Click to Open Camera" accept="image/*" onChange={imageCompress}/>
      <DatePicker value={bbDate} placeholder="Pick date" label="Best Before" onChange={setBBDate}/>
      <Group position="center" mt="xl">
        <Button
          variant="outline"
          onClick={submitForm}
        >
          Submit
        </Button>
      </Group>
    </div>
      </Drawer>
    </>
  );
}

export default NewItemDrawer