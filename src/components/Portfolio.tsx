
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, ExternalLink, Edit, Trash2, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([
    {
      type: "Design",
      title: "World Tiger Day instagram story ",
      description: "Instagram stories  lifestyle brand",
      thumbnail: "https://i.postimg.cc/N0kK9PnB/World-Tiger-Day-1.png",
      category: "Video Editing",
      driveLink: "https://drive.google.com/file/d/1CAW3oh-NdWg0Q21ajBLKHjuoE2lxB_bR/view?usp=drive_link"
    },
    {
      type: "Design",
      title: "Pintrest post ",
      description: "Brand tour template  for pinterst",
      thumbnail: "https://i.postimg.cc/Vknq4wv8/Golden-Triangle-with-Ranthambore-Tourst.png",
      category: "Graphic Design",
      driveLink: "https://drive.google.com/file/d/18RkKdkvanj_7wrzDLyDVZ9q9WxXfVQPD/view?usp=drive_link"
    },
    {
      type: "Video",
      title: "Instagram reels ",
      description: "Dynamic product video with motion graphics",
      thumbnail: "https://i.postimg.cc/4xYfT4tD/Tiger-female-in-Kanha-National-Park-in-India.png",
      category: "Video Editing",
      driveLink: "https://drive.google.com/file/d/17hngv2cB-Kru9XKCFaWlS5m2hOotVZKW/view?usp=drive_link"
    },
    {
      type: "Design",
      title: "Brand Identity",
      description: "",
      thumbnail: "https://i.postimg.cc/x8Xx1ZR1/World-Ranger-Day.png",
      category: "Branding",
      driveLink: "https://drive.google.com/file/d/1z9NnmxF6XGd7igHoxZ2u6AjPRsBPQUMQ/view?usp=drive_link"
    },
    {
      type: "Video",
      title: "Social media promotions ",
      description: "Conference recap video with interviews",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
      category: "Video Editing",
      driveLink: ""
    },
    {
      type: "Design",
      title: "World  Giraffe Day",
      description: "Animated story templates for influencer",
      thumbnail: "https://i.postimg.cc/mgBnQmZ8/World-Giraffe-Day.png",
      category: "Social Media stories",
      driveLink: "https://drive.google.com/file/d/1rC3cm1oOU4cPQcmFP45_jakP25MmTKov/view?usp=drive_link"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newItem, setNewItem] = useState({
    type: "",
    title: "",
    description: "",
    thumbnail: "",
    category: "",
    driveLink: ""
  });

  const { toast } = useToast();
  const ADMIN_PASSWORD = "Subodh@3223";

  const handlePasswordSubmit = () => {
    console.log("Password submitted:", password);
    console.log("Expected password:", ADMIN_PASSWORD);
    console.log("Pending action:", pendingAction);
    console.log("Selected item index:", selectedItemIndex);
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setIsPasswordDialogOpen(false);
      setPassword("");
      
      // Execute the pending action
      if (pendingAction === 'add') {
        setIsDialogOpen(true);
      } else if (pendingAction === 'edit' && selectedItemIndex !== null) {
        const item = portfolioItems[selectedItemIndex];
        setNewItem(item);
        setIsEditDialogOpen(true);
      } else if (pendingAction === 'delete' && selectedItemIndex !== null) {
        handleDeleteItem(selectedItemIndex);
      }
      
      // Reset pending action
      setPendingAction(null);
      setSelectedItemIndex(null);
      
      toast({
        title: "Success",
        description: "Authentication successful!",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const requestAccess = (action: 'add' | 'edit' | 'delete', itemIndex?: number) => {
    console.log("Requesting access for:", action, "at index:", itemIndex);
    
    setPendingAction(action);
    setSelectedItemIndex(itemIndex ?? null);
    setIsPasswordDialogOpen(true);
  };

  const handleAddItem = () => {
    console.log("Adding new item:", newItem);
    if (newItem.title && newItem.type && newItem.category) {
      setPortfolioItems([...portfolioItems, newItem]);
      setNewItem({
        type: "",
        title: "",
        description: "",
        thumbnail: "",
        category: "",
        driveLink: ""
      });
      setIsDialogOpen(false);
      setIsAuthenticated(false); // Reset authentication
      toast({
        title: "Success",
        description: "Portfolio item added successfully!",
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Title, Type, Category).",
        variant: "destructive",
      });
    }
  };

  const handleEditItem = () => {
    console.log("Editing item at index:", selectedItemIndex);
    console.log("New item data:", newItem);
    
    if (selectedItemIndex !== null && newItem.title && newItem.type && newItem.category) {
      const updatedItems = [...portfolioItems];
      updatedItems[selectedItemIndex] = { ...newItem };
      setPortfolioItems(updatedItems);
      
      // Reset form and close dialog
      setNewItem({
        type: "",
        title: "",
        description: "",
        thumbnail: "",
        category: "",
        driveLink: ""
      });
      setIsEditDialogOpen(false);
      setSelectedItemIndex(null);
      setIsAuthenticated(false); // Reset authentication
      
      toast({
        title: "Success",
        description: "Portfolio item updated successfully!",
      });
    } else {
      console.log("Validation failed:", {
        selectedItemIndex,
        title: newItem.title,
        type: newItem.type,
        category: newItem.category
      });
      toast({
        title: "Error",
        description: "Please fill in all required fields (Title, Type, Category).",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = (index: number) => {
    console.log("Deleting item at index:", index);
    const updatedItems = portfolioItems.filter((_, i) => i !== index);
    setPortfolioItems(updatedItems);
    setIsAuthenticated(false); // Reset authentication
    toast({
      title: "Success",
      description: "Portfolio item deleted successfully!",
    });
  };

  const openDriveLink = (driveLink: string) => {
    if (driveLink) {
      window.open(driveLink, '_blank');
    }
  };

  const handleEditClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Edit button clicked for index:", index);
    requestAccess('edit', index);
  };

  const handleDeleteClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete button clicked for index:", index);
    requestAccess('delete', index);
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A showcase of my creative work spanning video editing, graphic design, 
            and social media content creation
          </p>
          
          <Button 
            onClick={() => requestAccess('add')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Post
          </Button>

          {/* Password Dialog */}
          <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Admin Access Required
                </DialogTitle>
                <DialogDescription>
                  Enter the admin password to access portfolio management features.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setIsPasswordDialogOpen(false);
                  setPassword("");
                  setPendingAction(null);
                  setSelectedItemIndex(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={handlePasswordSubmit}>
                  Authenticate
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add New Item Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Portfolio Item</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new portfolio item to your collection.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={newItem.type} onValueChange={(value) => setNewItem({...newItem, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    placeholder="Enter project title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    placeholder="Enter project description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    placeholder="e.g. Video Editing, Graphic Design"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    value={newItem.thumbnail}
                    onChange={(e) => setNewItem({...newItem, thumbnail: e.target.value})}
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="driveLink">Google Drive Link (Optional)</Label>
                  <Input
                    id="driveLink"
                    value={newItem.driveLink}
                    onChange={(e) => setNewItem({...newItem, driveLink: e.target.value})}
                    placeholder="Enter Google Drive link"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Item Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Portfolio Item</DialogTitle>
                <DialogDescription>
                  Update the details of your portfolio item.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select value={newItem.type} onValueChange={(value) => setNewItem({...newItem, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    placeholder="Enter project title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    placeholder="Enter project description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    placeholder="e.g. Video Editing, Graphic Design"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
                  <Input
                    id="edit-thumbnail"
                    value={newItem.thumbnail}
                    onChange={(e) => setNewItem({...newItem, thumbnail: e.target.value})}
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-driveLink">Google Drive Link (Optional)</Label>
                  <Input
                    id="edit-driveLink"
                    value={newItem.driveLink}
                    onChange={(e) => setNewItem({...newItem, driveLink: e.target.value})}
                    placeholder="Enter Google Drive link"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => {
                  setIsEditDialogOpen(false);
                  setNewItem({
                    type: "",
                    title: "",
                    description: "",
                    thumbnail: "",
                    category: "",
                    driveLink: ""
                  });
                  setSelectedItemIndex(null);
                }}>
                  Cancel
                </Button>
                <Button onClick={handleEditItem}>
                  Update Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.thumbnail || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.type}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <button className="bg-white/90 text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-white transition-colors duration-200">
                      View Project
                    </button>
                    {item.driveLink && (
                      <button 
                        onClick={() => openDriveLink(item.driveLink)}
                        className="bg-purple-600/90 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-600 transition-colors duration-200 flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Drive
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-sm text-purple-600 font-medium mb-2">{item.category}</div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={(e) => handleEditClick(e, index)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      onClick={(e) => handleDeleteClick(e, index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
